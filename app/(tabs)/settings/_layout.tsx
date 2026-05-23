import { Drawer } from "expo-router/drawer"

const SettingsLayout: React.FC = () => {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
  )
}

export default SettingsLayout
