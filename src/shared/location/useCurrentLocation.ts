import * as Location from "expo-location"
import { useEffect, useState } from "react"
import { Platform } from "react-native"

import { type City } from "#shared/cities"

type Status = "loading" | "ready" | "denied" | "error" | "unsupported"

type State = {
  city: City | null
  status: Status
}

export function useCurrentLocation(): State {
  const [state, setState] = useState<State>({ city: null, status: "loading" })

  useEffect(() => {
    let cancelled = false

    void (async () => {
      if (Platform.OS === "web") {
        setState({ city: null, status: "unsupported" })
        return
      }

      const permission = await Location.requestForegroundPermissionsAsync()
      if (cancelled) return
      if (permission.status !== Location.PermissionStatus.GRANTED) {
        setState({ city: null, status: "denied" })
        return
      }

      try {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        })
        if (cancelled) return

        const [place] = await Location.reverseGeocodeAsync({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        if (cancelled) return

        const name = place?.city ?? place?.region ?? "Your Location"

        setState({
          city: {
            id: "current",
            name,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          status: "ready",
        })
      } catch {
        if (!cancelled) setState({ city: null, status: "error" })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
