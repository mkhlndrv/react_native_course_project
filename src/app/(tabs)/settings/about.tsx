import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title">About SkyCast</Typography>

      <Typography variant="normal">
        SkyCast is a small weather app built for FE411 at Harbour.Space.
      </Typography>

      <View style={styles.row}>
        <Typography variant="label">Data</Typography>
        <Typography variant="normal">
          Forecasts and current conditions from 7Timer (
          <Typography variant="muted">www.7timer.info</Typography>).
        </Typography>
      </View>

      <View style={styles.row}>
        <Typography variant="label">Built with</Typography>
        <Typography variant="normal">
          Expo · React Native · TypeScript · Expo Router
        </Typography>
      </View>

      <View style={styles.row}>
        <Typography variant="label">Version</Typography>
        <Typography variant="normal">1.0.0</Typography>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.inside,
    gap: spacing.between,
  },
  row: {
    gap: 4,
  },
})
