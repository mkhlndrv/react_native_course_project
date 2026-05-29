import { ActivityIndicator, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { useCurrentLocation } from "#shared/location"
import { CurrentWeather, Forecast } from "#shared/weather"

const fallback = {
  name: "Barcelona",
  latitude: 41.385063,
  longitude: 2.173404,
}

const App: React.FC = () => {
  const { city, status } = useCurrentLocation()

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.muted} />
      </View>
    )
  }

  const location = city ?? fallback
  const showingFallback = status !== "ready"

  return (
    <View style={styles.container}>
      <CurrentWeather location={location} />
      <Forecast location={location} />
      {showingFallback ? (
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
    justifyContent: "center",
    gap: spacing.between,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
})
