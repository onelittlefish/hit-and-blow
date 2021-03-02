import { GameManager } from "../src/logic/GameManager"
import { GuessUIManager } from "../src/presentation/guesses/GuessUIManager"
import { mockx } from "./mockx"

const MockGameManager = mockx.createMock(GameManager,
    ["target", "targetFound", "guesses"],
    {"size": 4, "guesses": []}
)

const MockGuessUIManager = mockx.createMock(GuessUIManager,
    ["currentGuess", "selectedPosition", "currentGuessNumber", "canSubmitCurrentGuess"],
    {"currentGuess": [], "selectedPosition": null}
)

export const TestContainer = {
    MockGameManager: MockGameManager,
    MockGuessUIManager: MockGuessUIManager
}