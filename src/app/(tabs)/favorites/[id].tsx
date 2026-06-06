import { Stack, useLocalSearchParams } from "expo-router"
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { type City } from "#shared/cities"
import { KEYS, usePersistedState } from "#shared/storage"
import { CurrentWeather, Forecast, HourlyForecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [favorites, , loaded] = usePersistedState<City[]>(KEYS.favorites, [])
  const city = favorites.find((c) => c.id === id)

  if (!loaded) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading…" }} />
        <View style={styles.center}>
          <ActivityIndicator color={colors.muted} />
        </View>
      </>
    )
  }

  if (!city) {
    return (
      <>
        <Stack.Screen options={{ title: "Unknown" }} />
        <View style={styles.empty}>
          <Typography variant="title">Unknown place</Typography>
          <Typography variant="muted">No favorite saved as “{id}”.</Typography>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: city.name }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <CurrentWeather location={city} />
        <HourlyForecast location={city} />
        <Forecast location={city} />
      </ScrollView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.inside,
    gap: spacing.between,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.inside,
    gap: spacing.between / 2,
  },
})
