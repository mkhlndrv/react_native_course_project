import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

export type StatProps = {
  value: number | undefined
  unit: string
  label: string
}

const Stat: React.FC<StatProps> = ({ value, unit, label }) => {
  return (
    <View style={styles.stat}>
      <Typography variant="label">{label}</Typography>
      <View style={styles.value}>
        <Typography variant="large">{value ?? "--"}</Typography>
        <Typography variant="muted"> {unit}</Typography>
      </View>
    </View>
  )
}

export default Stat

const styles = StyleSheet.create({
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  value: {
    flexDirection: "row",
    alignItems: "baseline",
  },
})
