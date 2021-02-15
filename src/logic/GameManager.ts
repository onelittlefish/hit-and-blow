import { observable, action, computed, autorun, isObservable, isObservableObject, makeObservable, trace } from "mobx"
import { sample } from "lodash"
import { ArrayHelper } from "./ArrayHelper"
import { Color, ColorHelper } from "./Color"

export class Guess {
    readonly id: number
    readonly guess: Color[]
    readonly hits: number
    readonly blows: number

    constructor(id: number, guess: Color[], hits: number, blows: number) {
        this.id = id
        this.guess = guess
        this.hits = hits
        this.blows = blows
    }
}

export class GameManager {
    readonly size = 4

    target: Color[] = []
    guesses: Guess[] = []

    constructor() {
        makeObservable(this, {
            target: observable,
            guesses: observable,
            newGame: action,
            submitGuess: action
        })

        this.newGame()
    }

    newGame() {
        const allColors = ColorHelper.allColors()
        this.target = ArrayHelper.times(this.size, () => sample(allColors))
        this.guesses = []
    }

    submitGuess(guess: Color[]) {
        var guessCopy = [...guess]
        var targetCopy = [...this.target]

        // Count the hits and add the misses to separate arrays
        var hits = 0
        var guessMisses: Color[] = []
        var targetMisses: Color[] = []
        while (guessCopy.length > 0 && targetCopy.length > 0) {
            if (guessCopy[0] == targetCopy[0]) {
                hits += 1
            } else {
                guessMisses.push(guessCopy[0])
                targetMisses.push(targetCopy[0])
            }
            guessCopy.splice(0, 1)
            targetCopy.splice(0, 1)
        }

        guessMisses.concat(guessCopy)
        targetMisses.concat(targetCopy)

        // Count the blows
        var blows = 0
        guessMisses.forEach(color => {
            const blowIndex = targetMisses.indexOf(color)
            if (blowIndex != -1) {
                blows += 1
                targetMisses.splice(blowIndex, 1)
            }
        })

        this.guesses.push(new Guess(this.guesses.length + 1, guess, hits, blows))
    }
}