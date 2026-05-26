import { Drawer } from "expo-router/drawer"

import { colors } from "#design/foundations"

const Layout: React.FC = () => {
  return (
    <Drawer screenOptions={{ drawerActiveTintColor: colors.brand }}>
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
      <Drawer.Screen name="about" options={{ title: "About" }} />
    </Drawer>
  )
}

export default Layout
