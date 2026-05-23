import { Tabs } from "expo-router"
import { Text } from "react-native"

const TabsLayout: React.FC = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Text>☀️</Text>,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: () => <Text>⭐</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: () => <Text>⚙️</Text>,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
