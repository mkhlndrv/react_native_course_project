import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { colors } from "#design/foundations"
import { KEYS, usePersistedState } from "#shared/storage"

import toWeather, { type Weather } from "./toWeather"

type Units = "c" | "f"

const toUnit = (c: number, u: Units): number =>
  u === "f" ? Math.round((c * 9) / 5 + 32) : c

type Day = {
  day: string
  weather: Weather
  max: number
  min: number
}

function weekday(yyyymmdd: number): string {
  const s = String(yyyymmdd)
  const iso = `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`
  return new Date(iso).toLocaleDateString("en", {
    weekday: "short",
    timeZone: "UTC",
  })
}

export const Forecast: React.FC<{
  location: {
    name: string
    latitude: number
    longitude: number
  }
}> = ({ location }) => {
  const [data, setData] = useState<Day[]>()
  const [units] = usePersistedState<Units>(KEYS.units, "c")

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(
          `https://www.7timer.info/bin/api.pl?lon=${location.longitude}&lat=${location.latitude}&product=civillight&output=json`,
        )
        const body = (await response.json()) as {
          dataseries: Array<{
            date: number
            weather: string
            temp2m: { max: number; min: number }
          }>
        }

        const days = body.dataseries.slice(0, 5).map((entry) => ({
          day: weekday(entry.date),
          weather: toWeather(entry.weather),
          max: entry.temp2m.max,
          min: entry.temp2m.min,
        }))

        setData(days)
      } catch (error) {
        console.warn("Forecast: fetch failed", error)
      }
    })()
  }, [location])

  return (
    <Card>
      <Typography variant="label">5-day forecast</Typography>

      {!data ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.muted} />
        </View>
      ) : null}

      <View style={styles.list}>
        {data?.map((entry, index) => (
          <View
            key={entry.day}
            style={[styles.row, index > 0 && styles.rowDivider]}
          >
            <View style={styles.day}>
              <Typography variant="normal">{entry.day}</Typography>
            </View>

            <Ionicons name={entry.weather.icon} size={22} color={colors.body} />

            <View style={styles.spacer} />

            <View style={styles.temp}>
              <Typography variant="large">
                {toUnit(entry.max, units)}°
              </Typography>
            </View>
            <View style={styles.temp}>
              <Typography variant="muted">
                {toUnit(entry.min, units)}°
              </Typography>
            </View>
          </View>
        ))}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 32,
  },
  list: {
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 16,
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  day: {
    width: 44,
  },
  spacer: {
    flex: 1,
  },
  temp: {
    width: 40,
    alignItems: "flex-end",
  },
})
