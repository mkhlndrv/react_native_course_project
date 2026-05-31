import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { type City } from "#shared/cities"
import { searchCities } from "#shared/geocoding"
import { useCurrentLocation } from "#shared/location"
import { CurrentWeather, Forecast } from "#shared/weather"

const fallback = {
  name: "Barcelona",
  latitude: 41.385063,
  longitude: 2.173404,
}

const App: React.FC = () => {
  const insets = useSafeAreaInsets()
  const { city, status } = useCurrentLocation()
  const [query, setQuery] = useState("")
  const [searched, setSearched] = useState<City | null>(null)
  const [suggestions, setSuggestions] = useState<City[]>([])
  const [searchState, setSearchState] = useState<
    "idle" | "searching" | "not-found"
  >("idle")

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

  const select = (next: City): void => {
    setSearched(next)
    setQuery("")
    setSuggestions([])
    setSearchState("idle")
  }

  const reset = (): void => {
    setSearched(null)
    setQuery("")
    setSuggestions([])
    setSearchState("idle")
  }

  const location = searched ?? city ?? fallback
  const showingFallback = !searched && status !== "ready"

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => {
              if (suggestions.length > 0) select(suggestions[0])
            }}
            placeholder="Search any city…"
            placeholderTextColor={colors.muted}
            returnKeyType="search"
            autoCapitalize="words"
            autoCorrect={false}
            style={styles.input}
          />
          {searchState === "searching" ? (
            <ActivityIndicator color={colors.muted} />
          ) : searched || query.length > 0 ? (
            <Pressable onPress={reset} hitSlop={8}>
              <Ionicons name="close-circle" size={20} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>

        {suggestions.length > 0 ? (
          <View style={styles.suggestions}>
            {suggestions.map((option, index) => (
              <Pressable
                key={option.id}
                onPress={() => select(option)}
                style={[
                  styles.suggestion,
                  index < suggestions.length - 1 && styles.suggestionDivider,
                ]}
              >
                <Ionicons name="location" size={16} color={colors.muted} />
                <Typography variant="normal">{option.name}</Typography>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      {status === "loading" && !searched ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.muted} />
        </View>
      ) : (
        <>
          <CurrentWeather location={location} />
          <Forecast location={location} />
        </>
      )}

      {searchState === "not-found" ? (
        <Typography variant="muted">
          No matches for “{query}”. Try a different spelling.
        </Typography>
      ) : searched ? (
        <Typography variant="muted">
          Showing weather for {searched.name}. Tap × to reset.
        </Typography>
      ) : showingFallback ? (
        <Typography variant="muted">
          {status === "denied"
            ? "Location permission denied — showing Barcelona."
            : status === "unsupported"
              ? "Location isn't available on web — showing Barcelona."
              : "Couldn't read your location — showing Barcelona."}
        </Typography>
      ) : null}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    backgroundColor: colors.background,
    gap: spacing.between,
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
    marginTop: 8,
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
})
