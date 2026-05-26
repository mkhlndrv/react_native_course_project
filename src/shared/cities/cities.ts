export type City = {
  id: string
  name: string
  latitude: number
  longitude: number
}

export const cities: City[] = [
  { id: "tokyo", name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  {
    id: "reykjavik",
    name: "Reykjavik",
    latitude: 64.1466,
    longitude: -21.9426,
  },
  { id: "new-york", name: "New York", latitude: 40.7128, longitude: -74.006 },
]

export function findCity(id: string): City | undefined {
  return cities.find((city) => city.id === id)
}
