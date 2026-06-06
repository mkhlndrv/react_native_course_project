import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { catalog, type City } from "#shared/cities"
import { searchCities } from "#shared/geocoding"
import { KEYS, usePersistedState } from "#shared/storage"
import { loadCurrent, type Reading } from "#shared/weather"

type Units = "c" | "f"
type SearchState = "idle" | "searching" | "not-found"

const toUnit = (c: number, u: Units): number =>
  u === "f" ? Math.round((c * 9) / 5 + 32) : c

const loadReadings = async (
  cities: City[],
): Promise<Record<string, Reading>> => {
  const results = await Promise.allSettled(cities.map((c) => loadCurrent(c)))
  const readings: Record<string, Reading> = {}
  results.forEach((result, i) => {
    if (result.status === "fulfilled") readings[cities[i].id] = result.value
  })
  return readings
}

const App: React.FC = () => {
  const [favorites, setFavorites, loaded] = usePersistedState<City[]>(
    KEYS.favorites,
    [],
  )
  const [units] = usePersistedState<Units>(KEYS.units, "c")
  const [readings, setReadings] = useState<Record<string, Reading>>({})
  const [refreshing, setRefreshing] = useState(false)

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<City[]>([])
  const [searchState, setSearchState] = useState<SearchState>("idle")

  useEffect(() => {
    if (!loaded) return
    let cancelled = false
    void loadReadings(favorites).then((r) => {
      if (!cancelled) setReadings(r)
    })

    return () => {
      cancelled = true
    }
  }, [loaded, favorites])

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setSuggestions([])
      setSearchState("idle")
      return
    }

    let cancelled = false
    setSearchState("searching")

    const handle = setTimeout(() => {
      void searchCities(trimmed).then((results) => {
        if (cancelled) return
        setSuggestions(results)
        setSearchState(results.length === 0 ? "not-found" : "idle")
      })
    }, 250)

    return () => {
      cancelled = true
      clearTimeout(handle)
    }
  }, [query])

  const isSaved = (id: string): boolean => favorites.some((c) => c.id === id)

  const add = (city: City): void => {
    if (isSaved(city.id)) return
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setFavorites([...favorites, city])
    setQuery("")
    setSuggestions([])
    setSearchState("idle")
  }

  const remove = (id: string): void => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setFavorites(favorites.filter((c) => c.id !== id))
  }

  const refresh = (): void => {
    setRefreshing(true)
    void loadReadings(favorites)
      .then((r) => setReadings(r))
      .finally(() => setRefreshing(false))
  }

  if (!loaded) {
    return (
      <>
        <Stack.Screen options={{ title: "Favorites" }} />
        <View style={styles.center}>
          <ActivityIndicator color={colors.muted} />
        </View>
      </>
    )
  }

  const popular = catalog.filter((c) => !isSaved(c.id))

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => {
              if (suggestions.length > 0) add(suggestions[0])
            }}
            placeholder="Search a city to add…"
            placeholderTextColor={colors.muted}
            returnKeyType="search"
            autoCapitalize="words"
            autoCorrect={false}
            style={styles.input}
          />
          {searchState === "searching" ? (
            <ActivityIndicator color={colors.muted} />
          ) : query.length > 0 ? (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons name="close-circle" size={20} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>

        {suggestions.length > 0 ? (
          <View style={styles.suggestions}>
            {suggestions.map((option, index) => (
              <Pressable
                key={option.id}
                onPress={() => add(option)}
                style={[
                  styles.suggestion,
                  index < suggestions.length - 1 && styles.suggestionDivider,
                ]}
              >
                <Ionicons
                  name={isSaved(option.id) ? "checkmark" : "add"}
                  size={18}
                  color={isSaved(option.id) ? colors.brand : colors.muted}
                />
                <Typography variant="normal">{option.name}</Typography>
              </Pressable>
            ))}
          </View>
        ) : searchState === "not-found" ? (
          <Typography variant="muted">
            No matches for “{query}”. Try a different spelling.
          </Typography>
        ) : null}

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={colors.muted}
            />
          }
        >
          <Typography variant="label">Saved places</Typography>

          {favorites.length === 0 ? (
            <Typography variant="muted">
              No favorites yet — search for a city above to add it.
            </Typography>
          ) : (
            favorites.map((city) => (
              <SavedRow
                key={city.id}
                city={city}
                reading={readings[city.id]}
                units={units}
                onRemove={() => remove(city.id)}
              />
            ))
          )}

          {query.trim().length === 0 && popular.length > 0 ? (
            <>
              <View style={styles.popularHeading}>
                <Typography variant="label">Popular</Typography>
              </View>
              {popular.map((city) => (
                <Pressable
                  key={city.id}
                  onPress={() => add(city)}
                  style={styles.addRow}
                  accessibilityLabel={`Add ${city.name}`}
                >
                  <Ionicons name="add" size={20} color={colors.muted} />
                  <Typography variant="large">{city.name}</Typography>
                </Pressable>
              ))}
            </>
          ) : null}
        </ScrollView>
      </View>
    </>
  )
}

export default App

type SavedRowProps = {
  city: City
  reading?: Reading
  units: Units
  onRemove: () => void
}

const SavedRow: React.FC<SavedRowProps> = ({
  city,
  reading,
  units,
  onRemove,
}) => {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onRemove}
        hitSlop={8}
        accessibilityLabel={`Remove ${city.name}`}
      >
        <Ionicons name="star" size={22} color={colors.brand} />
      </Pressable>

      <Typography
        variant="large"
        href={{ pathname: "/favorites/[id]", params: { id: city.id } }}
      >
        {city.name}
      </Typography>

      <View style={styles.reading}>
        {reading ? (
          <>
            <Ionicons
              name={reading.weather.icon}
              size={18}
              color={colors.muted}
            />
            <Typography variant="large">
              {toUnit(reading.temperature, units)}°
            </Typography>
          </>
        ) : (
          <ActivityIndicator color={colors.muted} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.inside,
    gap: spacing.inside,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.body,
  },
  suggestions: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: "hidden",
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  suggestionDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  content: {
    paddingBottom: spacing.between,
    gap: spacing.between / 2,
  },
  popularHeading: {
    paddingTop: spacing.between / 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  reading: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
})
