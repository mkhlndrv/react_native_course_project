import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"

const fakeLocation = {
  name: "Barcelona",
  latitude: 41.385,
  longitude: 2.173,
}

describe("Forecast", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => new Promise(() => undefined)) as jest.Mock
  })

  it("renders the section header while loading", () => {
    const { getByText } = render(<Forecast location={fakeLocation} />)

    expect(getByText("5-day forecast")).toBeTruthy()
  })
})
