import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Stat from "#design/elements/Stat"
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

        {data ? (
          <>
            <Typography variant="display">{data.temperature}°</Typography>
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
        <Stat value={data?.wind} unit="km/h" label="Wind" />
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
