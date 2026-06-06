import { render } from "@testing-library/react-native"

import { HourlyForecast } from "./HourlyForecast"

const fakeLocation = {
  name: "Barcelona",
  latitude: 41.385,
  longitude: 2.173,
}

describe("HourlyForecast", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => new Promise(() => undefined)) as jest.Mock
  })

  it("renders the section header while loading", () => {
    const { getByText } = render(<HourlyForecast location={fakeLocation} />)

    expect(getByText("Next 24 hours")).toBeTruthy()
  })
})
