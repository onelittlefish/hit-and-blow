import { Color } from "../../../src/logic/Color"
import { GameManager } from "../../../src/logic/GameManager"
import { Guess } from "../../../src/logic/Guess"
import { GuessUIManager } from "../../../src/presentation/guesses/GuessUIManager"
import { GuessViewModel } from "../../../src/presentation/guesses/GuessViewModel"
import { Result } from "../../../src/presentation/guesses/Result"
import { mockx } from "../../mockx"
import { TestContainer } from "../../TestContainer"

describe("GuessViewModel tests", () => {
    let model: GuessViewModel
    let gameManager: GameManager
    let guessUIManager: GuessUIManager

    const currentGuess = [Color.Yellow, Color.Green, null, null]
    const target = [Color.Red, Color.Blue, Color.Green, Color.Yellow]

    beforeEach(() => {
        gameManager = new TestContainer.MockGameManager()
        guessUIManager = new TestContainer.MockGuessUIManager()

        gameManager.targetFound = false
        gameManager.target = target

        mockx.mockReadonlyProperty(guessUIManager, "currentGuessNumber", 2)
        guessUIManager.currentGuess = currentGuess
        guessUIManager.selectedPosition = 1
    })

    describe("previous guess", () => {
        const guess = new Guess("id1", [Color.Red, Color.Red, Color.Blue, Color.Blue], 2, 1)

        beforeEach(() => {
            model = new GuessViewModel(guess, 1, gameManager, guessUIManager)
        })

        test("isEditable", () => {
            expect(model.isEditable).toEqual(false)
        })
    
        test("editableGuess", () => {
            expect(model.editableGuess).toEqual([null, null, null, null])
        })
    
        test("selectedPosition", () => {
            expect(model.selectedPosition).toEqual(null)
        })
    
        test("pegs", () => {
            expect(model.pegs).toEqual([
                [Color.Red, "0-R"],
                [Color.Red, "1-R"],
                [Color.Blue, "2-B"],
                [Color.Blue, "3-B"]
            ])
        })

        test("results", () => {
            expect(model.results).toEqual([
                [Result.Hit, 0],
                [Result.Hit, 1],
                [Result.Blow, 2],
                [null, 3]
            ])
        })

        test("isTarget", () => {
            expect(model.isTarget).toEqual(false)

            const targetGuess = new Guess("id2", target, 4, 0)
            model = new GuessViewModel(targetGuess, 2, gameManager, guessUIManager)
            expect(model.isTarget).toEqual(true)
        })

        test("submitGuess", () => {
            model.submitGuess()
            expect(guessUIManager.submitGuess).not.toHaveBeenCalled()
        })

        test("onDrop", () => {
            model.onDrop(Color.Pink, 2)
            expect(guessUIManager.selectColorForPosition).not.toHaveBeenCalled()
        })

        test("onClick", () => {
            model.onClick(Color.Red, 3)
            expect(guessUIManager.selectPosition).not.toHaveBeenCalled()
        })

        test("onDelete", () => {
            model.onDelete(0)
            expect(guessUIManager.removeColorForPosition).not.toHaveBeenCalled()
        })
    })

    describe("first empty guess", () => {
        beforeEach(() => {
            model = new GuessViewModel(null, 2, gameManager, guessUIManager)
        })

        test("isEditable", () => {
            expect(model.isEditable).toEqual(true)
            gameManager.targetFound = true
            expect(model.isEditable).toEqual(false)
        })
    
        test("editableGuess", () => {
            expect(model.editableGuess).toEqual(currentGuess)
        })
    
        test("selectedPosition", () => {
            expect(model.selectedPosition).toEqual(1)
        })
    
        test("pegs", () => {
            expect(model.pegs).toEqual([
                [Color.Yellow, "0-Y"],
                [Color.Green, "1-G"],
                [null, "2-null"],
                [null, "3-null"]
            ])
        })

        test("results", () => {
            expect(model.results).toEqual([
                [null, 0],
                [null, 1],
                [null, 2],
                [null, 3]
            ])
        })

        test("isTarget", () => {
            expect(model.isTarget).toEqual(false)
        })

        test("submitGuess", () => {
            model.submitGuess()
            expect(guessUIManager.submitGuess).toHaveBeenCalled()
        })

        test("onDrop", () => {
            model.onDrop(Color.Pink, 2)
            expect(guessUIManager.selectColorForPosition).toHaveBeenCalledWith(Color.Pink, 2)
        })

        test("onClick", () => {
            model.onClick(Color.Red, 3)
            expect(guessUIManager.selectPosition).toHaveBeenCalledWith(3)
        })

        test("onDelete", () => {
            model.onDelete(0)
            expect(guessUIManager.removeColorForPosition).toHaveBeenCalledWith(0)
        })
    })

    describe("nth empty guess", () => {
        beforeEach(() => {
            model = new GuessViewModel(null, 3, gameManager, guessUIManager)
        })

        test("isEditable", () => {
            expect(model.isEditable).toEqual(false)
        })

        test("editableGuess", () => {
            expect(model.editableGuess).toEqual([null, null, null, null])
        })

        test("selectedPosition", () => {
            expect(model.selectedPosition).toEqual(null)
        })
    
        test("pegs", () => {
            expect(model.pegs).toEqual([
                [null, "0-null"],
                [null, "1-null"],
                [null, "2-null"],
                [null, "3-null"]
            ])
        })

        test("results", () => {
            expect(model.results).toEqual([
                [null, 0],
                [null, 1],
                [null, 2],
                [null, 3]
            ])
        })

        test("isTarget", () => {
            expect(model.isTarget).toEqual(false)
        })

        test("submitGuess", () => {
            model.submitGuess()
            expect(guessUIManager.submitGuess).not.toHaveBeenCalled()
        })

        test("onDrop", () => {
            model.onDrop(Color.Pink, 2)
            expect(guessUIManager.selectColorForPosition).not.toHaveBeenCalled()
        })

        test("onClick", () => {
            model.onClick(Color.Red, 3)
            expect(guessUIManager.selectPosition).not.toHaveBeenCalled()
        })

        test("onDelete", () => {
            model.onDelete(0)
            expect(guessUIManager.removeColorForPosition).not.toHaveBeenCalled()
        })
    })
})
