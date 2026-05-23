import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"

import { useWeather } from "../../src/api/weather"
import CurrentWeather from "../../src/CurrentWeather"
import Forecast from "../../src/Forecast"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const Home: React.FC = () => {
  const { current, daily } = useWeather(location)

  return (
    <View style={styles.container}>
      <CurrentWeather location={location} data={current} />
      <Forecast data={daily} />

      <StatusBar style="auto" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
