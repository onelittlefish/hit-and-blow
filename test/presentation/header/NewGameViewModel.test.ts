import { GameManager } from "../../../src/logic/GameManager"
import { NewGameViewModel } from "../../../src/presentation/header/NewGameViewModel"
import { TestContainer } from "../../TestContainer"

describe("NewGameViewModel tests", () => {
    let model: NewGameViewModel
    let guesssUIManager: GameManager

    beforeEach(() => {
        guesssUIManager = new TestContainer.MockGameManager()
        model = new NewGameViewModel(guesssUIManager)
    })

    test("newGame", () => {
        model.newGame()
        expect(guesssUIManager.newGame).toHaveBeenCalled()
    })
})
