import { Result } from "../../../src/presentation/guesses/Result"
import { ResultPegViewHelper } from "../../../src/presentation/pegs/ResultPegViewHelper"

describe("ResultPegViewHelper tests", () => {
    test("getLabel", () => {
        expect(ResultPegViewHelper.getLabel(null)).toEqual("")
        expect(ResultPegViewHelper.getLabel(Result.Hit)).not.toEqual("")
    })
})
