import { StyleSheet, View } from "react-native"

import { colors, spacing } from "#design/foundations"
import { CurrentWeather, Forecast } from "#shared/weather"

const home = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <CurrentWeather location={home} />
      <Forecast location={home} />
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
})
