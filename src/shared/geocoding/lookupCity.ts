import { type City } from "#shared/cities"

type Response = {
  results?: Array<{
    name: string
    latitude: number
    longitude: number
    country?: string
    admin1?: string
  }>
}

export async function searchCities(query: string, count = 5): Promise<City[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=${count}&language=en&format=json`
  const response = await fetch(url)
  const body = (await response.json()) as Response

  return (body.results ?? []).map((hit) => {
    const parts = [hit.name]
    if (hit.admin1 && hit.admin1 !== hit.name) parts.push(hit.admin1)
    if (hit.country) parts.push(hit.country)
    return {
      id: `lookup:${hit.name.toLowerCase()}:${hit.latitude.toFixed(2)}:${hit.longitude.toFixed(2)}`,
      name: parts.join(", "),
      latitude: hit.latitude,
      longitude: hit.longitude,
    }
  })
}

export async function lookupCity(query: string): Promise<City | null> {
  const [first] = await searchCities(query, 1)
  return first ?? null
}
