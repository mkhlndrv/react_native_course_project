import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

import { colors } from "#design/foundations"

const Layout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="star" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default Layout
