import { Color } from "../../../src/logic/Color"
import { GameManager } from "../../../src/logic/GameManager"
import { Guess } from "../../../src/logic/Guess"
import { GuessUIManager } from "../../../src/presentation/guesses/GuessUIManager"
import { TestContainer } from "../../TestContainer"

describe("GuessUIManager tests", () => {
    let manager: GuessUIManager
    let gameManager: GameManager

    beforeEach(() => {
        gameManager = new TestContainer.MockGameManager()
        manager = new GuessUIManager(gameManager)
    })

    test("init", () => {
        expect(manager.currentGuess).toEqual([null, null, null, null])
        expect(manager.selectedPosition).toBeNull()
        expect(manager.canSubmitCurrentGuess).toEqual(false)
    })

    test("currentGuessNumber", () => {
        gameManager.guesses = [
            new Guess("id1", [Color.Red, Color.Red, Color.Red, Color.Red], 2, 2),
            new Guess("id2", [Color.Red, Color.Red, Color.Red, Color.Red], 2, 2)
        ]
        expect(manager.currentGuessNumber).toEqual(2)
    })

    test("canSubmitCurrentGuess", () => {
        expect(manager.canSubmitCurrentGuess).toEqual(false)
        manager.selectColorForPosition(Color.Red, 0)
        expect(manager.canSubmitCurrentGuess).toEqual(false)
        manager.selectColorForPosition(Color.Red, 1)
        expect(manager.canSubmitCurrentGuess).toEqual(false)
        manager.selectColorForPosition(Color.Red, 2)
        expect(manager.canSubmitCurrentGuess).toEqual(false)
        manager.selectColorForPosition(Color.Red, 3)
        expect(manager.canSubmitCurrentGuess).toEqual(true)
    })
    
    test("selectPosition", () => {
        manager.selectPosition(1)
        expect(manager.selectedPosition).toEqual(1)
        manager.selectPosition(3)
        expect(manager.selectedPosition).toEqual(3)
        manager.selectPosition(3)
        expect(manager.selectedPosition).toBeNull()
    })

    test("selectColor", () => {
        manager.selectColor(Color.Red)
        expect(manager.currentGuess).toEqual([null, null, null, null])

        manager.selectPosition(2)
        manager.selectColor(Color.Red)
        expect(manager.currentGuess).toEqual([null, null, Color.Red, null])
        
        manager.selectColor(Color.Blue)
        expect(manager.currentGuess).toEqual([null, null, Color.Red, Color.Blue])
    })

    test("selectNextOpenPosition", () => {
        manager.selectPosition(2)
        expect(manager.selectedPosition).toEqual(2)
        
        manager.selectColor(Color.Red)
        expect(manager.selectedPosition).toEqual(3)
        
        manager.selectColor(Color.Blue)
        expect(manager.selectedPosition).toEqual(0)
        
        manager.selectColor(Color.Green)
        expect(manager.selectedPosition).toEqual(1)
        
        manager.selectColor(Color.Yellow)
        expect(manager.selectedPosition).toEqual(1)
        
        expect(manager.currentGuess).toEqual([Color.Green, Color.Yellow, Color.Red, Color.Blue])
    })
    
    test("selectColorForPosition", () => {
        manager.selectPosition(1)
        manager.selectColorForPosition(Color.Red, 2)
        expect(manager.currentGuess).toEqual([null, null, Color.Red, null])
        expect(manager.selectedPosition).toEqual(1)
    })
    
    test("removeColorForPosition", () => {
        manager.selectColorForPosition(Color.Red, 1)
        manager.removeColorForPosition(1)
        expect(manager.currentGuess).toEqual([null, null, null, null])
    })

    test("submitGuess", () => {
        manager.selectColorForPosition(Color.Red, 0)
        manager.submitGuess()
        expect(gameManager.submitGuess).not.toHaveBeenCalled()
        manager.selectColorForPosition(Color.Red, 1)
        manager.submitGuess()
        expect(gameManager.submitGuess).not.toHaveBeenCalled()
        manager.selectColorForPosition(Color.Red, 2)
        manager.submitGuess()
        expect(gameManager.submitGuess).not.toHaveBeenCalled()
        manager.selectColorForPosition(Color.Red, 3)
        manager.submitGuess()
        expect(gameManager.submitGuess).toHaveBeenCalled()
    })

    test("submitGuess resets state", () => {
        manager.selectPosition(1)
        manager.selectColorForPosition(Color.Red, 0)
        manager.selectColorForPosition(Color.Red, 1)
        manager.selectColorForPosition(Color.Red, 2)
        manager.selectColorForPosition(Color.Red, 3)
        manager.submitGuess()
        expect(manager.currentGuess).toEqual([null, null, null, null])
        expect(manager.selectedPosition).toEqual(0)
    })

    test("clearing guesses resets state", () => {
        gameManager.guesses = [
            new Guess("id", [Color.Red, Color.Red, Color.Red, Color.Red], 2, 2)
        ]
        
        manager.selectColorForPosition(Color.Blue, 0)
        expect(manager.currentGuess).toEqual([Color.Blue, null, null, null])

        manager.selectPosition(3)
        expect(manager.selectedPosition).toEqual(3)

        gameManager.guesses = []
        expect(manager.currentGuess).toEqual([null, null, null, null])
        expect(manager.selectedPosition).toEqual(0)
    })

})
