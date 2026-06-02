import { render } from "@testing-library/react-native"

import Stat from "./Stat"

describe("Stat", () => {
  it("renders", () => {
    const { getByText } = render(<Stat value={12} unit="km/h" label="Wind" />)
    expect(getByText("Wind")).toBeTruthy()
  })

  describe("value display", () => {
    it("shows the value when defined", () => {
      const { getByText } = render(
        <Stat value={42} unit="%" label="Humidity" />,
      )

      expect(getByText("42")).toBeTruthy()
    })

    it("falls back to dashes when the value is undefined", () => {
      const { getByText, queryByText } = render(
        <Stat value={undefined} unit="%" label="Humidity" />,
      )

      expect(getByText("--")).toBeTruthy()
      expect(queryByText("undefined")).toBeNull()
    })
  })

  describe("integration", () => {
    it("renders the label, value, and unit together", () => {
      const { getByText } = render(<Stat value={12} unit="km/h" label="Wind" />)

      expect(getByText("Wind")).toBeTruthy()
      expect(getByText("12")).toBeTruthy()
      expect(getByText("km/h", { exact: false })).toBeTruthy()
    })
  })
})
