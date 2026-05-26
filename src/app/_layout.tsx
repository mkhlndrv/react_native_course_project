import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { colors } from "#design/foundations"

const Layout: React.FC = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.body,
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="dark" />
    </>
  )
}

export default Layout
