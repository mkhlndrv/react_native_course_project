import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

const favorites = ["barcelona", "tokyo", "reykjavik"]

const FavoritesIndex: React.FC = () => {
  return (
    <View style={styles.container}>
      {favorites.map((id) => (
        <Link key={id} href={`/favorites/${id}`} style={styles.item}>
          <Text style={styles.itemText}>{id}</Text>
        </Link>
      ))}
    </View>
  )
}

export default FavoritesIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
})
