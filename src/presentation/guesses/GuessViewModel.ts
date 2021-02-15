import { autorun, computed, makeObservable, observable } from "mobx";
import { GameManager, Guess } from "../../logic/GameManager";
import { Color } from "../../logic/Color";
import { reduce } from "lodash"
import { ArrayHelper } from "../../logic/ArrayHelper";
import { Result } from "./Result";

export class GuessViewModel {
    readonly guess: Guess | null
    private gameManager: GameManager

    constructor(guess: Guess | null, gameManager: GameManager) {
        this.guess = guess
        this.gameManager = gameManager

        makeObservable(this, {
            guess: observable,
            pegs: computed,
            results: computed,
            guessString: computed,
            hits: computed,
            blows: computed
        })
    }

    get pegs(): [Color | null, number][] {
        let pegs: (Color | null)[]
        if (this.guess == null) {
            pegs = ArrayHelper.times(this.gameManager.size, (): Color | null => { return null })
        } else {
            pegs = this.guess.guess
        }
        console.log("gpegs " + pegs)
        return ArrayHelper.enumeratedMap(pegs, (guess, index) => { return [guess, index] })
    }

    get results(): [Result | null, number][] {
        let results: (Result | null)[]
        if (this.guess == null) {
            results = ArrayHelper.times(this.gameManager.size, (): Result | null => { return null })
        } else {
            const numEmpty = this.gameManager.size - this.guess.hits - this.guess.blows
            results = ArrayHelper.times(this.guess.hits, () => { return Result.Hit })
                .concat(ArrayHelper.times(this.guess.blows, () => { return Result.Blow }))
                .concat(ArrayHelper.times(numEmpty, (): Result | null => { return null }))
        }
        return ArrayHelper.enumeratedMap(results, (result, index) => { return [result, index] })
    }

    get guessString(): string {
        return reduce(this.guess.guess, (str: string, color: Color) => {
            return str + (str.length > 0 ? ", " : "") + color
        }, "")
    }

    get hits(): number {
        return this.guess.hits
    }

    get blows(): number {
        return this.guess.blows
    }
}