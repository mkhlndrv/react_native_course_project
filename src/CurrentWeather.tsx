import { StyleSheet, Text, View } from "react-native"

import { type CurrentConditions, type Location } from "./api/weather"
import Card from "./Card"

const CurrentWeather: React.FC<{
  location: Location
  data?: CurrentConditions
}> = ({ location, data }) => {
  return (
    <Card>
      <View style={styles.current}>
        <Text style={styles.temperature}>{data?.temperature ?? "--"} C</Text>
        <Text style={styles.location}>{location.name}</Text>
        <Text style={styles.condition}>{data?.condition ?? "--"}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {data?.wind.toFixed(0) ?? "--"} km/h
          </Text>
          <Text style={styles.statLabel}>Wind</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {data?.humidity.toFixed(0) ?? "--"}%
          </Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{data?.uv.toFixed(0) ?? "--"}</Text>
          <Text style={styles.statLabel}>UV</Text>
        </View>
      </View>
    </Card>
  )
}

export default CurrentWeather

const styles = StyleSheet.create({
  current: { alignItems: "center", marginBottom: 24 },
  temperature: { fontSize: 28 },
  location: { fontSize: 12, color: "#888" },
  condition: { fontWeight: "bold" },
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "500" },
  statLabel: { fontSize: 12, color: "#888", marginTop: 2 },
})
