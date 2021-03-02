import { ColorHelper } from "../../src/logic/Color"

test("allColors", () => {
    expect(ColorHelper.allColors().length).toEqual(6)
})