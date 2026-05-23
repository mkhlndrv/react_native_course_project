import { useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

const FavoriteDetail: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Favorite</Text>
      <Text style={styles.value}>{id}</Text>
    </View>
  )
}

export default FavoriteDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "capitalize",
  },
})
