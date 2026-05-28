export type City = {
  id: string
  name: string
  latitude: number
  longitude: number
}

export const catalog: City[] = [
  { id: "tokyo", name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  {
    id: "reykjavik",
    name: "Reykjavik",
    latitude: 64.1466,
    longitude: -21.9426,
  },
  { id: "new-york", name: "New York", latitude: 40.7128, longitude: -74.006 },
  { id: "barcelona", name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
  { id: "paris", name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { id: "london", name: "London", latitude: 51.5074, longitude: -0.1278 },
]

export function findCity(id: string): City | undefined {
  return catalog.find((city) => city.id === id)
}
