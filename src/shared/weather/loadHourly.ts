import toWeather, { type Weather } from "./toWeather"

export type HourlySlot = {
  time: string
  temperature: number
  weather: Weather
}

type Dataseries = {
  timepoint: number
  temp2m: number
  weather: string
}

const SLOTS = 8

export async function loadHourly(location: {
  latitude: number
  longitude: number
}): Promise<HourlySlot[]> {
  const response = await fetch(
    `https://www.7timer.info/bin/api.pl?lon=${location.longitude}&lat=${location.latitude}&product=civil&output=json`,
  )
  const body = (await response.json()) as {
    init: string
    dataseries: Dataseries[]
  }

  const start = parseInit(body.init)

  return body.dataseries.slice(0, SLOTS).map((entry) => {
    const when = new Date(start.getTime() + entry.timepoint * 3600 * 1000)
    return {
      time: when.toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temperature: entry.temp2m,
      weather: toWeather(entry.weather),
    }
  })
}

function parseInit(init: string): Date {
  const iso = `${init.slice(0, 4)}-${init.slice(4, 6)}-${init.slice(6, 8)}T${init.slice(8, 10)}:00:00Z`
  return new Date(iso)
}
