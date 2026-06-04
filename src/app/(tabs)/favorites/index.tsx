import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { catalog, type City } from "#shared/cities"
import { KEYS, usePersistedState } from "#shared/storage"
import { loadCurrent, type Reading } from "#shared/weather"

type Units = "c" | "f"
type Section = { key: string; title: string }

const toUnit = (c: number, u: Units): number =>
  u === "f" ? Math.round((c * 9) / 5 + 32) : c

const loadReadings = async (
  cities: City[],
): Promise<Record<string, Reading>> => {
  const results = await Promise.allSettled(
    cities.map((city) => loadCurrent(city)),
  )
  const readings: Record<string, Reading> = {}
  results.forEach((result, i) => {
    if (result.status === "fulfilled") readings[cities[i].id] = result.value
  })
  return readings
}

const App: React.FC = () => {
  const [favIds, setFavIds, loaded] = usePersistedState<string[]>(
    KEYS.favorites,
    [],
  )
  const [units] = usePersistedState<Units>(KEYS.units, "c")
  const [readings, setReadings] = useState<Record<string, Reading>>({})
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!loaded) return
    let cancelled = false
    void loadReadings(catalog.filter((c) => favIds.includes(c.id))).then(
      (r) => {
        if (!cancelled) setReadings(r)
      },
    )

    return () => {
      cancelled = true
    }
  }, [loaded, favIds])

  const refresh = (): void => {
    setRefreshing(true)
    void loadReadings(catalog.filter((c) => favIds.includes(c.id)))
      .then((r) => setReadings(r))
      .finally(() => setRefreshing(false))
  }

  const toggle = (id: string): void => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setFavIds(
      favIds.includes(id) ? favIds.filter((x) => x !== id) : [...favIds, id],
    )
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

  const saved = catalog.filter((city) => favIds.includes(city.id))
  const rest = catalog.filter((city) => !favIds.includes(city.id))
  const sections = [
    { key: "saved", title: "Saved places", data: saved },
    ...(rest.length > 0
      ? [{ key: "add", title: "Add a city", data: rest }]
      : []),
  ]

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <SectionList<City, Section>
        style={styles.container}
        contentContainerStyle={styles.content}
        sections={sections}
        keyExtractor={(city) => city.id}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.muted}
          />
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.heading}>
            <Typography variant="label">{section.title}</Typography>
          </View>
        )}
        renderSectionFooter={({ section }) =>
          section.key === "saved" && section.data.length === 0 ? (
            <Typography variant="muted">
              No favorites yet — tap a city below to add it.
            </Typography>
          ) : null
        }
        renderItem={({ item, section }) => (
          <Row
            city={item}
            saved={section.key === "saved"}
            reading={readings[item.id]}
            units={units}
            onToggle={() => toggle(item.id)}
          />
        )}
      />
    </>
  )
}

export default App

type RowProps = {
  city: City
  saved: boolean
  reading?: Reading
  units: Units
  onToggle: () => void
}

const Row: React.FC<RowProps> = ({ city, saved, reading, units, onToggle }) => {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        hitSlop={8}
        accessibilityLabel={`${saved ? "Remove" : "Add"} ${city.name}`}
      >
        <Ionicons
          name={saved ? "star" : "star-outline"}
          size={22}
          color={saved ? colors.brand : colors.muted}
        />
      </Pressable>

      {saved ? (
        <Typography
          variant="large"
          href={{ pathname: "/favorites/[id]", params: { id: city.id } }}
        >
          {city.name}
        </Typography>
      ) : (
        <Typography variant="large">{city.name}</Typography>
      )}

      {saved ? (
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
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.inside,
    paddingBottom: spacing.between,
    gap: spacing.between / 2,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  heading: {
    paddingTop: spacing.between / 2,
  },
  row: {
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
