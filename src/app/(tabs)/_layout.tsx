import Ionicons from "@expo/vector-icons/Ionicons"
import { Tabs } from "expo-router"

import { colors } from "#design/foundations"

type IconProps = { focused: boolean; color: string; size: number }

const icon =
  (
    active: React.ComponentProps<typeof Ionicons>["name"],
    inactive: React.ComponentProps<typeof Ionicons>["name"],
  ) =>
  ({ focused, color, size }: IconProps) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color} />
  )

const Layout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.body,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: icon("home", "home-outline"),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: icon("star", "star-outline"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: icon("settings", "settings-outline"),
        }}
      />
    </Tabs>
  )
}

export default Layout
