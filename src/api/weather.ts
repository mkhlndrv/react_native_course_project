import { useEffect, useState } from "react"

export type Location = {
  name: string
  latitude: number
  longitude: number
}

export type CurrentConditions = {
  condition: number
  temperature: number
  wind: number
  humidity: number
  uv: number
}

export type DailyForecast = {
  day: string
  temperatureMax: number
  temperatureMin: number
  condition: number
}

type WeatherResponse = {
  current: {
    weather_code: number
    temperature_2m: number
    wind_speed_10m: number
    relative_humidity_2m: number
    uv_index: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

async function fetchWeather(
  location: Location,
  signal: AbortSignal,
): Promise<{ current: CurrentConditions; daily: DailyForecast[] }> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code`

  const response = await fetch(url, { signal })
  const data = (await response.json()) as WeatherResponse

  const current: CurrentConditions = {
    condition: data.current.weather_code,
    temperature: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    uv: data.current.uv_index,
  }

  const daily: DailyForecast[] = []
  for (let i = 0; i < data.daily.time.length; i++) {
    daily.push({
      day: data.daily.time[i],
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      condition: data.daily.weather_code[i],
    })
  }

  return { current, daily }
}

export function useWeather(location: Location): {
  current?: CurrentConditions
  daily?: DailyForecast[]
  loading: boolean
  error?: Error
} {
  const [current, setCurrent] = useState<CurrentConditions>()
  const [daily, setDaily] = useState<DailyForecast[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(undefined)

    fetchWeather(location, controller.signal)
      .then((result) => {
        setCurrent(result.current)
        setDaily(result.daily)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        console.warn("Failed to fetch weather", err)
        setError(err as Error)
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [location])

  return { current, daily, loading, error }
}
