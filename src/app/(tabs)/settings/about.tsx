import { StyleSheet, View } from "react-native"

import InfoRow from "#design/elements/InfoRow"
import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title">About SkyCast</Typography>

      <Typography variant="normal">
        SkyCast is a small weather app built for FE411 at Harbour.Space.
      </Typography>

      <InfoRow label="Data">
        Forecasts and current conditions from 7Timer (
        <Typography variant="muted">www.7timer.info</Typography>).
      </InfoRow>

      <InfoRow label="Built with">
        Expo · React Native · TypeScript · Expo Router
      </InfoRow>

      <InfoRow label="Version">1.0.0</InfoRow>
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
})
