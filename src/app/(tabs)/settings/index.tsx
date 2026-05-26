import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title">Settings</Typography>
      <Typography variant="muted">
        Open the drawer from the top-left to see more.
      </Typography>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.inside,
    gap: spacing.between / 2,
  },
})
