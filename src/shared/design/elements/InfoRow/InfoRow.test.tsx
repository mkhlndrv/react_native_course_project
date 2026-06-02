import { render } from "@testing-library/react-native"

import InfoRow from "./InfoRow"

describe("InfoRow", () => {
  it("renders the label and content", () => {
    const { getByText } = render(<InfoRow label="Version">1.0.0</InfoRow>)

    expect(getByText("Version")).toBeTruthy()
    expect(getByText("1.0.0")).toBeTruthy()
  })
})
