import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { findCity } from "#shared/cities"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const city = findCity(id)

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

      <View style={styles.container}>
        <CurrentWeather location={city} />
        <Forecast location={city} />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    backgroundColor: colors.background,
    justifyContent: "center",
    gap: spacing.between,
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
