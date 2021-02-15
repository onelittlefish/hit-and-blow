import { computed, makeObservable } from "mobx";
import { ArrayHelper } from "../../logic/ArrayHelper";
import { GameManager, Guess } from "../../logic/GameManager";

export class GuessesViewModel {
    private gameManager: GameManager
    private minGuessSlots = 8

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager

        makeObservable(this, {
            guesses: computed
        })
    }

    get guesses(): [(Guess | null), number][] {
        const numEmpty = Math.max(this.minGuessSlots - this.gameManager.guesses.length, 0)
        const guesses = this.gameManager.guesses
            // .concat(ArrayHelper.times(numEmpty, (): Guess | null => { return null }))
        return ArrayHelper.enumeratedMap(guesses, (guess, index) => { return [guess, index] })
    }
}