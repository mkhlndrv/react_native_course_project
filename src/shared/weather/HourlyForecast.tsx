import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { colors } from "#design/foundations"
import { KEYS, usePersistedState } from "#shared/storage"

import { type HourlySlot, loadHourly } from "./loadHourly"

type Units = "c" | "f"

const toUnit = (c: number, u: Units): number =>
  u === "f" ? Math.round((c * 9) / 5 + 32) : c

export const HourlyForecast: React.FC<{
  location: {
    name: string
    latitude: number
    longitude: number
  }
}> = ({ location }) => {
  const [data, setData] = useState<HourlySlot[]>()
  const [units] = usePersistedState<Units>(KEYS.units, "c")

  useEffect(() => {
    void (async () => {
      try {
        setData(await loadHourly(location))
      } catch (error) {
        console.warn("HourlyForecast: fetch failed", error)
      }
    })()
  }, [location])

  return (
    <Card>
      <Typography variant="label">Next 24 hours</Typography>

      {!data ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.muted} />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {data.map((slot) => (
            <View key={slot.time} style={styles.slot}>
              <Typography variant="muted">{slot.time}</Typography>
              <Ionicons
                name={slot.weather.icon}
                size={24}
                color={colors.body}
              />
              <Typography variant="large">
                {toUnit(slot.temperature, units)}°
              </Typography>
            </View>
          ))}
        </ScrollView>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 32,
  },
  row: {
    marginTop: 12,
    gap: 20,
  },
  slot: {
    alignItems: "center",
    gap: 10,
  },
})
