import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"

import toWeather, { type Weather } from "./toWeather"

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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.days}
      >
        {data?.map((entry) => (
          <View key={entry.day} style={styles.day}>
            <Typography variant="label">{entry.day}</Typography>
            <Ionicons
              name={entry.weather.icon}
              size={28}
              color={colors.brand}
            />
            <Typography variant="large">{entry.max}°</Typography>
            <Typography variant="muted">{entry.min}°</Typography>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  days: {
    paddingTop: spacing.between,
    gap: spacing.between,
  },
  day: {
    minWidth: 64,
    alignItems: "center",
    gap: 6,
  },
})
