import { render } from "@testing-library/react-native"

import Typography from "./Typography"

describe("Typography", () => {
  it("renders", () => {
    const { getByText } = render(<Typography>hello</Typography>)
    expect(getByText("hello")).toBeTruthy()
  })

  it("renders the children text", () => {
    const { getByText } = render(<Typography variant="title">Skies</Typography>)

    expect(getByText("Skies")).toBeTruthy()
  })
})
