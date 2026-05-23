import { Stack } from "expo-router"

const FavoritesLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Favorites" }} />
      <Stack.Screen name="[id]" options={{ title: "Favorite" }} />
    </Stack>
  )
}

export default FavoritesLayout
