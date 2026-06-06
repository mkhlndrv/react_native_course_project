import AsyncStorage from "@react-native-async-storage/async-storage"
import { render, userEvent } from "@testing-library/react-native"

import { KEYS } from "#shared/storage"

import Favorites from "../src/app/(tabs)/favorites/index"

jest.mock("expo-router", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native")
  return {
    Stack: { Screen: () => null },
    Link: ({ children }: { children: React.ReactNode }) => (
      <Text>{children}</Text>
    ),
  }
})

jest.mock("expo-haptics", () => ({
  ImpactFeedbackStyle: { Light: "light" },
  impactAsync: jest.fn().mockResolvedValue(undefined),
}))

describe("Favorites", () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => new Promise(() => undefined)) as jest.Mock
    await AsyncStorage.clear()
    ;(AsyncStorage.setItem as jest.Mock).mockClear()
  })

  it("saves the full city when a popular city is added", async () => {
    const user = userEvent.setup()
    const { findByLabelText } = render(<Favorites />)

    const addTokyo = await findByLabelText("Add Tokyo")
    await user.press(addTokyo)

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      KEYS.favorites,
      JSON.stringify([
        { id: "tokyo", name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
      ]),
    )
  })
})
