import { Color } from "../../../src/logic/Color"
import { GameManager } from "../../../src/logic/GameManager"
import { Guess } from "../../../src/logic/Guess"
import { GuessesViewModel } from "../../../src/presentation/guesses/GuessesViewModel"
import { TestContainer } from "../../TestContainer"

describe("GuessesViewModel tests", () => {
    let model: GuessesViewModel
    let gameManager: GameManager

    beforeEach(() => {
        gameManager = new TestContainer.MockGameManager()
        model = new GuessesViewModel(gameManager)
        model["minGuessSlots"] = 3
    })

    test("no guesses", () => {
        gameManager.guesses = []
        expect(model.guesses).toEqual([
            [null, "empty-0"],
            [null, "empty-1"],
            [null, "empty-2"]
        ])
    })

    test("< minGuessSlots guesses", () => {
        const guess1 = new Guess("id1", [Color.Red, Color.Red, Color.Blue, Color.Blue], 1, 1)
        gameManager.guesses = [
            guess1
        ]
        expect(model.guesses).toEqual([
            [guess1, "id1"],
            [null, "empty-1"],
            [null, "empty-2"]
        ])
    })

    test(">= minGuessSlots guesses", () => {
        const guess1 = new Guess("id1", [Color.Red, Color.Red, Color.Blue, Color.Blue], 1, 1)
        const guess2 = new Guess("id2", [Color.Yellow, Color.Yellow, Color.Yellow, Color.Yellow], 0, 0)
        const guess3 = new Guess("id3", [Color.Green, Color.Green, Color.Green, Color.Green], 1, 0)
        gameManager.guesses = [
            guess1,
            guess2,
            guess3
        ]
        expect(model.guesses).toEqual([
            [guess1, "id1"],
            [guess2, "id2"],
            [guess3, "id3"],
            [null, "empty-3"]
        ])
    })
})
