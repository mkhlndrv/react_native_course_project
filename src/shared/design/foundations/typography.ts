import { Platform, type TextStyle } from "react-native"

import { body, muted as mutedColor } from "./colors"

export const typography = {
  display: {
    fontSize: 96,
    fontWeight: "200",
    color: body,
    letterSpacing: -4,
    fontVariant: ["tabular-nums"],
  },
  title: { fontSize: 22, fontWeight: "600", color: body, letterSpacing: -0.4 },
  large: {
    fontSize: 17,
    fontWeight: "500",
    color: body,
    fontVariant: ["tabular-nums"],
  },
  normal: { fontSize: 15, color: body },
  muted: { fontSize: 13, color: mutedColor, fontVariant: ["tabular-nums"] },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: mutedColor,
  },
  mono: {
    fontSize: 15,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
    fontVariant: ["tabular-nums"],
    color: body,
  },
} satisfies Record<string, TextStyle>
