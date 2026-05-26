import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"

import toWeather, { cloudCover, type Weather, windKmh } from "./toWeather"

type Reading = {
  weather: Weather
  temperature: number
  wind: number
  humidity: number
  cloud: number
}

export const CurrentWeather: React.FC<{
  location: {
    name: string
    latitude: number
    longitude: number
  }
}> = ({ location }) => {
  const [data, setData] = useState<Reading>()

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(
          `https://www.7timer.info/bin/api.pl?lon=${location.longitude}&lat=${location.latitude}&product=civil&output=json`,
        )
        const body = (await response.json()) as {
          dataseries: Array<{
            temp2m: number
            rh2m: string
            wind10m: { speed: number }
            cloudcover: number
            weather: string
          }>
        }
        const now = body.dataseries[0]

        setData({
          weather: toWeather(now.weather),
          temperature: now.temp2m,
          wind: windKmh(now.wind10m.speed),
          humidity: parseInt(now.rh2m, 10),
          cloud: cloudCover(now.cloudcover),
        })
      } catch (error) {
        console.warn("CurrentWeather: fetch failed", error)
      }
    })()
  }, [location])

  return (
    <Card>
      <View style={styles.hero}>
        <Typography variant="label">{location.name}</Typography>

        <View style={styles.tempRow}>
          <Ionicons
            name={data?.weather.icon ?? "help-circle-outline"}
            size={56}
            color={colors.brand}
          />
          <Typography variant="display">
            {data ? `${data.temperature}°` : "--"}
          </Typography>
        </View>

        <Typography variant="large">{data?.weather.label ?? "--"}</Typography>
      </View>

      <View style={styles.divider} />

      <View style={styles.stats}>
        <Stat
          icon="speedometer-outline"
          value={data?.wind}
          unit="km/h"
          label="Wind"
        />
        <Stat
          icon="water-outline"
          value={data?.humidity}
          unit="%"
          label="Humidity"
        />
        <Stat icon="cloud-outline" value={data?.cloud} unit="%" label="Cloud" />
      </View>
    </Card>
  )
}

const Stat: React.FC<{
  icon: React.ComponentProps<typeof Ionicons>["name"]
  value: number | undefined
  unit: string
  label: string
}> = ({ icon, value, unit, label }) => {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.muted} />
      <Typography variant="large">{value ?? "--"}</Typography>
      <Typography variant="muted">{unit}</Typography>
      <Typography variant="label">{label}</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    gap: spacing.between / 4,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.between / 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    marginVertical: spacing.between,
  },
  stats: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
})
