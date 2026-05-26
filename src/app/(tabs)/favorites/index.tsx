import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { cities } from "#shared/cities"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <Typography variant="label">Saved places</Typography>

        <View style={styles.list}>
          {cities.map((city) => (
            <Typography
              key={city.id}
              variant="title"
              href={{ pathname: "/favorites/[id]", params: { id: city.id } }}
            >
              {city.name}
            </Typography>
          ))}
        </View>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.inside,
    backgroundColor: colors.background,
    gap: spacing.between,
  },
  list: {
    gap: spacing.between / 2,
  },
})
