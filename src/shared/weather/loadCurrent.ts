import toWeather, { cloudCover, type Weather, windKmh } from "./toWeather"

export type Reading = {
  weather: Weather
  temperature: number
  wind: number
  humidity: number
  cloud: number
}

type Dataseries = {
  temp2m: number
  rh2m: string
  wind10m: { speed: number }
  cloudcover: number
  weather: string
}

export async function loadCurrent(location: {
  latitude: number
  longitude: number
}): Promise<Reading> {
  const response = await fetch(
    `https://www.7timer.info/bin/api.pl?lon=${location.longitude}&lat=${location.latitude}&product=civil&output=json`,
  )
  const body = (await response.json()) as { dataseries: Dataseries[] }
  const now = body.dataseries[0]

  return {
    weather: toWeather(now.weather),
    temperature: now.temp2m,
    wind: windKmh(now.wind10m.speed),
    humidity: parseInt(now.rh2m, 10),
    cloud: cloudCover(now.cloudcover),
  }
}
