import { type Ionicons } from "@expo/vector-icons"

export type IconName = React.ComponentProps<typeof Ionicons>["name"]

export type Weather = {
  label: string
  icon: IconName
}

const baseMap: Record<
  string,
  { label: string; icon: IconName; nightIcon?: IconName }
> = {
  clear: { label: "Clear", icon: "sunny", nightIcon: "moon" },
  pcloudy: {
    label: "Partly cloudy",
    icon: "partly-sunny",
    nightIcon: "cloudy-night",
  },
  mcloudy: { label: "Mostly cloudy", icon: "cloudy" },
  cloudy: { label: "Cloudy", icon: "cloudy" },
  humid: { label: "Humid", icon: "water" },
  lightrain: { label: "Light rain", icon: "rainy" },
  oshower: { label: "Occasional showers", icon: "rainy" },
  ishower: { label: "Showers", icon: "rainy" },
  lightsnow: { label: "Light snow", icon: "snow" },
  rain: { label: "Rain", icon: "rainy" },
  snow: { label: "Snow", icon: "snow" },
  rainsnow: { label: "Sleet", icon: "snow" },
  ts: { label: "Thunderstorm", icon: "thunderstorm" },
  tsrain: { label: "Thunderstorm", icon: "thunderstorm" },
  windy: { label: "Windy", icon: "cloud" },
  fog: { label: "Fog", icon: "cloud" },
}

function strip(code: string): { base: string; night: boolean } {
  if (code.endsWith("night")) return { base: code.slice(0, -5), night: true }
  if (code.endsWith("day")) return { base: code.slice(0, -3), night: false }
  return { base: code, night: false }
}

export default function toWeather(code: string): Weather {
  const { base, night } = strip(code)
  const entry = baseMap[base]
  if (!entry) return { label: code, icon: "help-circle-outline" }
  return {
    label: entry.label,
    icon: night && entry.nightIcon ? entry.nightIcon : entry.icon,
  }
}

const beaufortKmh = [0, 0, 5, 12, 19, 28, 40, 55, 70, 85, 100, 115, 130]

export function windKmh(beaufort: number): number {
  return beaufortKmh[Math.min(Math.max(beaufort, 0), 12)]
}

const cloudPercent = [0, 3, 13, 25, 38, 50, 63, 75, 88, 97]

export function cloudCover(scale: number): number {
  return cloudPercent[Math.min(Math.max(scale, 0), 9)]
}
