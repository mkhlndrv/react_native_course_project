import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import { useWeather } from "./api/weather"
import CurrentWeather from "./CurrentWeather"
import Forecast from "./Forecast"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  const { current, daily } = useWeather(location)

  return (
    <View style={styles.container}>
      <Text>Weather App</Text>

      <CurrentWeather location={location} data={current} />
      <Forecast data={daily} />

      <StatusBar style="auto" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
