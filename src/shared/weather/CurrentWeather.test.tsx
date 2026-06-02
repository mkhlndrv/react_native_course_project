import { render } from "@testing-library/react-native"

import { CurrentWeather } from "./CurrentWeather"

const fakeLocation = {
  name: "Barcelona",
  latitude: 41.385,
  longitude: 2.173,
}

describe("CurrentWeather", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => new Promise(() => undefined)) as jest.Mock
  })

  it("renders the location label while loading", () => {
    const { getByText } = render(<CurrentWeather location={fakeLocation} />)

    expect(getByText("Barcelona")).toBeTruthy()
  })
})
