import { action, computed, makeObservable, observable } from "mobx";
import { GameManager } from "../../logic/GameManager";
import { Guess } from "../../logic/Guess";
import { Color } from "../../logic/Color";
import { ArrayHelper } from "../../logic/ArrayHelper";
import { Result } from "./Result";
import { isEqual } from "lodash";
import { GuessUIManager } from "./GuessUIManager";

export class GuessViewModel {
    readonly guess: (Guess | null)
    private guessNumber: number
    private gameManager: GameManager
    private guessUIManager: GuessUIManager

    constructor(guess: (Guess | null), guessNumber: number, gameManager: GameManager, guessUIManager: GuessUIManager) {
        this.guess = guess
        this.guessNumber = guessNumber
        this.gameManager = gameManager
        this.guessUIManager = guessUIManager

        makeObservable(this, {
            isEditable: computed,
            editableGuess: computed,
            isSubmitEnabled: computed,
            pegs: computed,
            results: computed,
            isTarget: computed,
            submitGuess: action,
            onDrop: action,
            onClick: action
        })
    }

    get isEditable(): boolean {
        return !this.gameManager.targetFound && this.guessNumber == this.guessUIManager.currentGuessNumber
    }

    get editableGuess(): (Color | null)[] {
        return this.isEditable ? this.guessUIManager.currentGuess : ArrayHelper.times(this.gameManager.size, (): Color | null => { return null })
    }
    
    get selectedPosition(): (number | null) {
        return this.isEditable ? this.guessUIManager.selectedPosition : null
    }

    get isSubmitEnabled(): boolean {
        return this.guessUIManager.canSubmitCurrentGuess
    }

    get pegs(): [Color | null, string][] {
        let pegs: (Color | null)[]
        if (this.guess == null) {
            pegs = this.editableGuess
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

    get isTarget(): boolean {
        return this.guess != null && isEqual(this.guess.guess, this.gameManager.target)
    }

    submitGuess() {
        if (this.isEditable) {
            this.guessUIManager.submitGuess()
        }
    }

    onDrop(color: Color, id: number) {
        if (this.isEditable) {
            this.guessUIManager.selectColorForPosition(color, id)
        }
    }

    onClick(color: Color, id: number) {
        if (this.isEditable) {
            this.guessUIManager.selectPosition(id)
        }
    }

    onDelete(id: number) {
        if (this.isEditable) {
            this.guessUIManager.removeColorForPosition(id)
        }
    }
}