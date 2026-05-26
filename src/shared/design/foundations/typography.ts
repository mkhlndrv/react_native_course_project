import { Platform, type TextStyle } from "react-native"

import { body, muted as mutedColor } from "./colors"

export const display: TextStyle = {
  fontSize: 96,
  fontWeight: "200",
  color: body,
  letterSpacing: -4,
  fontVariant: ["tabular-nums"],
}

export const title: TextStyle = {
  fontSize: 22,
  fontWeight: "600",
  color: body,
  letterSpacing: -0.4,
}

export const large: TextStyle = {
  fontSize: 17,
  fontWeight: "500",
  color: body,
  fontVariant: ["tabular-nums"],
}

export const normal: TextStyle = {
  fontSize: 15,
  color: body,
}

export const muted: TextStyle = {
  fontSize: 13,
  color: mutedColor,
  fontVariant: ["tabular-nums"],
}

export const label: TextStyle = {
  fontSize: 11,
  fontWeight: "600",
  letterSpacing: 1.2,
  textTransform: "uppercase",
  color: mutedColor,
}

export const mono: TextStyle = {
  fontSize: 15,
  fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
  fontVariant: ["tabular-nums"],
  color: body,
}
