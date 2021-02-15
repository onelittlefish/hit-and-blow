import { action, computed, makeObservable, observable } from "mobx";
import { GameManager } from "../../logic/GameManager";
import { Guess } from "../../logic/Guess";
import { Color } from "../../logic/Color";
import { ArrayHelper } from "../../logic/ArrayHelper";
import { Result } from "./Result";
import { every } from "lodash";

export class GuessViewModel {
    readonly guess: (Guess | null)
    _editableGuess: (Color | null)[]
    private guessNumber: number
    private gameManager: GameManager

    constructor(guess: (Guess | null), guessNumber: number, gameManager: GameManager) {
        this.guess = guess
        this._editableGuess = ArrayHelper.times(gameManager.size, (): Color | null => { return null })
        this.guessNumber = guessNumber
        this.gameManager = gameManager

        makeObservable(this, {
            _editableGuess: observable,
            isEditable: computed,
            isSubmitEnabled: computed,
            pegs: computed,
            results: computed,
            submitGuess: action,
            onDrop: action
        })
    }

    get isEditable(): boolean {
        return this.guessNumber == this.gameManager.guesses.length
    }

    get isSubmitEnabled(): boolean {
        return every(this._editableGuess, (guess) => { return guess != null })
    }

    get pegs(): [Color | null, string][] {
        let pegs: (Color | null)[]
        if (this.guess == null) {
            pegs = this._editableGuess
        } else {
            pegs = this.guess.guess
        }
        return pegs.map((color, index) => {
            return [color, index.toString() + "-" + (color || "null")]
        })
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
        return results.map((result, index) => {
            return [result, index]
        })
    }

    submitGuess() {
        if (this.isEditable && this.isSubmitEnabled) {
            this.gameManager.submitGuess(this._editableGuess)
        }
    }

    onDrop(color: Color, id: number) {
        this._editableGuess[id] = color
    }
}