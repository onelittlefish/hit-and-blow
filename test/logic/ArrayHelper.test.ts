import { ArrayHelper } from "../../src/logic/ArrayHelper"

test("timesMap", () => {
    const repeat = ArrayHelper.times(2, () => { return "a" })
    expect(repeat).toEqual(["a", "a"])

    const double = ArrayHelper.times(3, (index) => { return index * 2 })
    expect(double).toEqual([0, 2, 4])
})