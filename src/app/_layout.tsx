import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

const Layout: React.FC = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </>
  )
}

export default Layout
