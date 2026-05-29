import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { Stack } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { catalog, type City } from "#shared/cities"
import { KEYS, usePersistedState } from "#shared/storage"

const App: React.FC = () => {
  const [favIds, setFavIds, loaded] = usePersistedState<string[]>(
    KEYS.favorites,
    [],
  )

  const toggle = (id: string): void => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setFavIds(
      favIds.includes(id) ? favIds.filter((x) => x !== id) : [...favIds, id],
    )
  }

  const saved = catalog.filter((city) => favIds.includes(city.id))
  const rest = catalog.filter((city) => !favIds.includes(city.id))

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <Typography variant="label">Saved places</Typography>

        {!loaded ? null : saved.length === 0 ? (
          <Typography variant="muted">
            No favorites yet — tap a city below to add it.
          </Typography>
        ) : (
          <View style={styles.list}>
            {saved.map((city) => (
              <Row
                key={city.id}
                city={city}
                saved
                onToggle={() => toggle(city.id)}
              />
            ))}
          </View>
        )}

        {rest.length > 0 ? (
          <>
            <Typography variant="label">Add a city</Typography>
            <View style={styles.list}>
              {rest.map((city) => (
                <Row
                  key={city.id}
                  city={city}
                  saved={false}
                  onToggle={() => toggle(city.id)}
                />
              ))}
            </View>
          </>
        ) : null}
      </View>
    </>
  )
}

export default App

type RowProps = {
  city: City
  saved: boolean
  onToggle: () => void
}

const Row: React.FC<RowProps> = ({ city, saved, onToggle }) => {
  return (
    <View style={styles.row}>
      <Pressable onPress={onToggle} hitSlop={8}>
        <Ionicons
          name={saved ? "star" : "star-outline"}
          size={22}
          color={saved ? colors.brand : colors.muted}
        />
      </Pressable>
      {saved ? (
        <Typography
          variant="large"
          href={{ pathname: "/favorites/[id]", params: { id: city.id } }}
        >
          {city.name}
        </Typography>
      ) : (
        <Typography variant="large">{city.name}</Typography>
      )}
    </View>
  )
}

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
})
