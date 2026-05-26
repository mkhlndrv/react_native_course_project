import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

export type InfoRowProps = {
  label: string
  children: React.ReactNode
}

const InfoRow: React.FC<InfoRowProps> = ({ label, children }) => {
  return (
    <View style={styles.row}>
      <Typography variant="label">{label}</Typography>
      <Typography variant="normal">{children}</Typography>
    </View>
  )
}

export default InfoRow

const styles = StyleSheet.create({
  row: {
    gap: 4,
  },
})
