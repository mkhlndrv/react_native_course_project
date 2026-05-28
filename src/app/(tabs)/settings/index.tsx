import { Pressable, StyleSheet, Text, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { KEYS, usePersistedState } from "#shared/storage"

type Units = "c" | "f"

const App: React.FC = () => {
  const [units, setUnits] = usePersistedState<Units>(KEYS.units, "c")

  return (
    <View style={styles.container}>
      <Typography variant="title">Settings</Typography>

      <Card>
        <View style={styles.row}>
          <Typography variant="label">Units</Typography>
          <View style={styles.toggle}>
            <UnitButton
              label="°C"
              active={units === "c"}
              onPress={() => setUnits("c")}
            />
            <UnitButton
              label="°F"
              active={units === "f"}
              onPress={() => setUnits("f")}
            />
          </View>
        </View>
      </Card>

      <Typography variant="muted">
        Open the drawer from the top-left to see more.
      </Typography>
    </View>
  )
}

export default App

type UnitButtonProps = {
  label: string
  active: boolean
  onPress: () => void
}

const UnitButton: React.FC<UnitButtonProps> = ({ label, active, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.unit, active ? styles.unitActive : styles.unitInactive]}
    >
      <Text
        style={[styles.unitText, active ? styles.unitTextActive : undefined]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.inside,
    gap: spacing.between,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.between,
  },
  toggle: {
    flexDirection: "row",
    gap: 8,
  },
  unit: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  unitActive: {
    backgroundColor: colors.body,
  },
  unitInactive: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  unitText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.body,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  unitTextActive: {
    color: colors.background,
  },
})
