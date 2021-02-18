import { observable, action, makeObservable } from "mobx"
import { sample } from "lodash"
import { ArrayHelper } from "./ArrayHelper"
import { Color, ColorHelper } from "./Color"
import { Guess } from "./Guess"

export class GameManager {
    readonly size = 4

    target: Color[] = []
    targetFound = false
    guesses: Guess[] = []

    constructor() {
        makeObservable(this, {
            target: observable,
            targetFound: observable,
            guesses: observable,
            newGame: action,
            submitGuess: action
        })

        this.newGame()
    }

    newGame(): void {
        const allColors = ColorHelper.allColors()
        this.target = ArrayHelper.times(this.size, () => sample(allColors))
        this.targetFound = false
        this.guesses = []
    }

    submitGuess(guess: Color[]): void {
        const guessCopy = [...guess]
        const targetCopy = [...this.target]

        // Count the hits and add the misses to separate arrays
        let hits = 0
        const guessMisses: Color[] = []
        const targetMisses: Color[] = []
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
        let blows = 0
        guessMisses.forEach(color => {
            const blowIndex = targetMisses.indexOf(color)
            if (blowIndex != -1) {
                blows += 1
                targetMisses.splice(blowIndex, 1)
            }
        })

        this.guesses.push(new Guess("submitted-" + (this.guesses.length + 1), guess, hits, blows))

        if (hits == this.size) {
            this.targetFound = true
        }
    }
}