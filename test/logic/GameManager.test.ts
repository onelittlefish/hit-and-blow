import { Color, ColorHelper } from "../../src/logic/Color"
import { GameManager } from "../../src/logic/GameManager"
import { ArrayHelper } from "../../src/logic/ArrayHelper"

describe("GameManager tests", () => {
    let manager: GameManager

    beforeEach(() => {
        manager = new GameManager()
    })

    test("init", () => {
        expect(manager.target.length).toEqual(4)
        expect(manager.targetFound).toEqual(false)
        expect(manager.guesses.length).toEqual(0)
    })
    
    test("submit guess with 4 hits", () => {
        const guess = manager.target
        manager.submitGuess(guess)

        expect(manager.guesses.length).toEqual(1)
        const actualGuess = manager.guesses[0]
        expect(actualGuess.guess).toEqual(guess)
        expect(actualGuess.hits).toEqual(4)
        expect(actualGuess.blows).toEqual(0)
    })
    
    test("submit guess with 0 hits & 0 blows", () => {
        const target = manager.target
        const nonPresentColor = ColorHelper.allColors().find((color) => {
            return !target.includes(color)
        })
        const guess = ArrayHelper.times(4, () => { return nonPresentColor })
        manager.submitGuess(guess)

        expect(manager.guesses.length).toEqual(1)
        const actualGuess = manager.guesses[0]
        expect(actualGuess.guess).toEqual(guess)
        expect(actualGuess.hits).toEqual(0)
        expect(actualGuess.blows).toEqual(0)
    })
    
    test("submit guess with 1 hit & 1 blow", () => {
        manager.target = [Color.Red, Color.Red, Color.Blue, Color.Blue]
        const guess = [Color.Red, Color.Blue, Color.Green, Color.Yellow]
        manager.submitGuess(guess)

        expect(manager.guesses.length).toEqual(1)
        const actualGuess = manager.guesses[0]
        expect(actualGuess.guess).toEqual(guess)
        expect(actualGuess.hits).toEqual(1)
        expect(actualGuess.blows).toEqual(1)
    })
    
    test("submit guess with 2 hits & 2 blows", () => {
        manager.target = [Color.Red, Color.Red, Color.Blue, Color.Blue]
        const guess = [Color.Red, Color.Blue, Color.Red, Color.Blue]
        manager.submitGuess(guess)

        expect(manager.guesses.length).toEqual(1)
        const actualGuess = manager.guesses[0]
        expect(actualGuess.guess).toEqual(guess)
        expect(actualGuess.hits).toEqual(2)
        expect(actualGuess.blows).toEqual(2)
    })
    
    test("submit guess with 4 blows", () => {
        manager.target = [Color.Red, Color.Red, Color.Blue, Color.Blue]
        const guess = [Color.Blue, Color.Blue, Color.Red, Color.Red]
        manager.submitGuess(guess)

        expect(manager.guesses.length).toEqual(1)
        const actualGuess = manager.guesses[0]
        expect(actualGuess.guess).toEqual(guess)
        expect(actualGuess.hits).toEqual(0)
        expect(actualGuess.blows).toEqual(4)
    })

    test("target found", () => {
        manager.submitGuess(manager.target)
        expect(manager.targetFound).toEqual(true)
    })
    
    test("new game", () => {
        manager.submitGuess(manager.target)
        manager.newGame()
        expect(manager.targetFound).toEqual(false)
        expect(manager.guesses.length).toEqual(0)
    })
})
