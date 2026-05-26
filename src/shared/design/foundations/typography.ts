import { type TextStyle } from "react-native"

import { body, muted as mutedColor } from "./colors"

export const display: TextStyle = {
  fontSize: 64,
  fontWeight: "200",
  color: body,
  letterSpacing: -2,
}

export const title: TextStyle = {
  fontSize: 28,
  fontWeight: "600",
  color: body,
}

export const large: TextStyle = {
  fontSize: 22,
  fontWeight: "500",
  color: body,
}

export const normal: TextStyle = {
  fontSize: 16,
  color: body,
}

export const muted: TextStyle = {
  fontSize: 14,
  color: mutedColor,
}

export const label: TextStyle = {
  fontSize: 12,
  fontWeight: "600",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: mutedColor,
}
