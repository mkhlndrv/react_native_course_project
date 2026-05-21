import { StyleSheet, View } from "react-native"

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 16,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
  },
})
