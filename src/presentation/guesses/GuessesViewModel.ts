import { computed, makeObservable } from "mobx";
import { ArrayHelper } from "../../logic/ArrayHelper";
import { GameManager } from "../../logic/GameManager";
import { Guess } from "../../logic/Guess";

export class GuessesViewModel {
    private gameManager: GameManager
    private minGuessSlots = 8

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager

        makeObservable(this, {
            guesses: computed
        })
    }

    get guesses(): [(Guess | null), string][] {
        const submittedGuesses = this.gameManager.guesses.map((guess): [(Guess | null), string] => {
            return [guess, guess.id]
        })
        const numEmpty = Math.max(this.minGuessSlots - this.gameManager.guesses.length, 0)
        const emptyGuesses = ArrayHelper.times(numEmpty, (index): [(Guess | null), string] => {
            return [null, "empty-" + (submittedGuesses.length + index)]
        })
        return submittedGuesses.concat(emptyGuesses)
    }
}