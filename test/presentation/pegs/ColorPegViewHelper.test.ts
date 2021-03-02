import { Color } from "../../../src/logic/Color"
import { Theme } from "../../../src/presentation/common/Theme.styles"
import { ColorPegViewHelper } from "../../../src/presentation/pegs/ColorPegViewHelper"

describe("ColorPegViewHelper tests", () => {
    test("getBackgroundColor", () => {
        expect(ColorPegViewHelper.getBackgroundColor(Color.Red, true, Color.Blue)).toEqual(Theme.blue)
        expect(ColorPegViewHelper.getBackgroundColor(null, true, Color.Blue)).toEqual(Theme.blue)
        expect(ColorPegViewHelper.getBackgroundColor(Color.Red, true, null)).toEqual(Theme.red)
        expect(ColorPegViewHelper.getBackgroundColor(null, true, null)).toEqual(Theme.white)

        expect(ColorPegViewHelper.getBackgroundColor(Color.Red, false, Color.Blue)).toEqual(Theme.blue)
        expect(ColorPegViewHelper.getBackgroundColor(null, false, Color.Blue)).toEqual(Theme.blue)
        expect(ColorPegViewHelper.getBackgroundColor(Color.Red, false, null)).toEqual(Theme.red)
        expect(ColorPegViewHelper.getBackgroundColor(null, false, null)).toEqual(Theme.darkGrey)
    })

    test("getLabel", () => {
        expect(ColorPegViewHelper.getLabel(null)).toEqual("")
        expect(ColorPegViewHelper.getLabel(Color.Red)).not.toEqual("")
    })
})
