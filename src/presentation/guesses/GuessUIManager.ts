import { action, autorun, computed, makeObservable, observable } from "mobx"
import { ArrayHelper } from "../../logic/ArrayHelper"
import { Color } from "../../logic/Color"
import { GameManager } from "../../logic/GameManager"
import { every, findIndex } from "lodash"

export class GuessUIManager {
    private gameManager: GameManager
    currentGuess: (Color | null)[]
    selectedPosition: number | null

    constructor(gameManger: GameManager) {
        this.gameManager = gameManger
        this._resetState()

        makeObservable(this, {
            currentGuess: observable,
            selectedPosition: observable,
            currentGuessNumber: computed,
            canSubmitCurrentGuess: computed,
            selectPosition: action,
            selectColor: action,
            selectColorForPosition: action,
            removeColorForPosition: action,
            _resetState: action,
            _selectNextOpenPosition: action
        })

        autorun(() => {
            if (this.gameManager.guesses.length == 0) {
                this._resetState()
            }
        })
    }

    get currentGuessNumber(): number {
        return this.gameManager.guesses.length
    }

    get canSubmitCurrentGuess(): boolean {
        return every(this.currentGuess, (guess) => { return guess != null })
    }

    selectPosition(position: number): void {
        if (this.selectedPosition == position) {
            this.selectedPosition = null
        } else {
            this.selectedPosition = position
        }
    }

    selectColor(color: Color): void {
        if (this.selectedPosition != null) {
            this.selectColorForPosition(color, this.selectedPosition)
        }
    }

    selectColorForPosition(color: Color, position: number): void {
        this.currentGuess[position] = color
        this._selectNextOpenPosition()
    }

    removeColorForPosition(position: number): void {
        this.currentGuess[position] = null
    }

    submitGuess(): void {
        if (this.canSubmitCurrentGuess) {
            this.gameManager.submitGuess(this.currentGuess)
            this._resetState()
        }
    }

    _resetState(): void {
        this.currentGuess = ArrayHelper.times(this.gameManager.size, (): Color | null => { return null })
        if (this.selectedPosition != null) {
            this.selectedPosition = 0
        } else {
            this.selectedPosition = null
        }
    }

    _selectNextOpenPosition(): void {
        if (this.selectedPosition != null) {
            const nextOpenPosition = findIndex(this.currentGuess, (guess) => {
                return guess == null
            })
            if (nextOpenPosition != -1) {
                this.selectedPosition = nextOpenPosition
            }
        }
    }
}