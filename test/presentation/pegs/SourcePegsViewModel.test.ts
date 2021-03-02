import { Color } from "../../../src/logic/Color"
import { GuessUIManager } from "../../../src/presentation/guesses/GuessUIManager"
import { SourcePegsViewModel } from "../../../src/presentation/pegs/SourcePegsViewModel"
import { TestContainer } from "../../TestContainer"

describe("SourcePegsViewModel tests", () => {
    let model: SourcePegsViewModel
    let guessUIManager: GuessUIManager

    beforeEach(() => {
        guessUIManager = new TestContainer.MockGuessUIManager()
        model = new SourcePegsViewModel(guessUIManager)
    })

    test("onClick", () => {
        model.onClick(Color.Red, 0)
        expect(guessUIManager.selectColor).toHaveBeenCalledWith(Color.Red)
    })
})
