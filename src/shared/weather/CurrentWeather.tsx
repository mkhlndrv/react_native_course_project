import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Stat from "#design/elements/Stat"
import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { KEYS, usePersistedState } from "#shared/storage"

import { loadCurrent, type Reading } from "./loadCurrent"

type Units = "c" | "f"
type WindUnits = "kmh" | "mph"

const toUnit = (c: number, u: Units): number =>
  u === "f" ? Math.round((c * 9) / 5 + 32) : c

const toWind = (kmh: number, u: WindUnits): number =>
  u === "mph" ? Math.round(kmh * 0.621371) : kmh

export const CurrentWeather: React.FC<{
  location: {
    name: string
    latitude: number
    longitude: number
  }
}> = ({ location }) => {
  const [data, setData] = useState<Reading>()
  const [units] = usePersistedState<Units>(KEYS.units, "c")
  const [windUnits] = usePersistedState<WindUnits>(KEYS.windUnits, "kmh")

  useEffect(() => {
    void (async () => {
      try {
        setData(await loadCurrent(location))
      } catch (error) {
        console.warn("CurrentWeather: fetch failed", error)
      }
    })()
  }, [location])

  return (
    <Card>
      <View style={styles.hero}>
        <Typography variant="label">{location.name}</Typography>

        {data ? (
          <>
            <Typography variant="display">
              {toUnit(data.temperature, units)}°
            </Typography>
            <View style={styles.condition}>
              <Ionicons
                name={data.weather.icon}
                size={18}
                color={colors.muted}
              />
              <Typography variant="normal">{data.weather.label}</Typography>
            </View>
          </>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.muted} />
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.stats}>
        <Stat
          value={data ? toWind(data.wind, windUnits) : undefined}
          unit={windUnits === "mph" ? "mph" : "km/h"}
          label="Wind"
        />
        <Stat value={data?.humidity} unit="%" label="Humidity" />
        <Stat value={data?.cloud} unit="%" label="Cloud" />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    gap: 4,
  },
  condition: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  loading: {
    height: 140,
    justifyContent: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.between,
  },
  stats: {
    flexDirection: "row",
  },
})
