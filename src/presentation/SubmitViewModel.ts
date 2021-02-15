import { action, makeObservable, observable } from "mobx";
import { GameManager } from "../logic/GameManager";
import { Color } from "../logic/Color";

export class SubmitViewModel {
    private gameManager: GameManager

    guess = ""

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager

        makeObservable(this, {
            guess: observable,
            setGuess: action,
            submitGuess: action,
            newGame: action
        })
    }
    
    setGuess(value: string) {
        this.guess = value
    }
    
    submitGuess() {
        const guess = this.convert(this.guess)
        this.gameManager.submitGuess(guess)
        this.setGuess("")
    }
    
    private convert(guess: string): Color[] {
        var colors: Color[] = []
        for (let char of guess) {
            const color = char as Color
            colors.push(color)
        }
        return colors
    }

    newGame() {
        this.gameManager.newGame()
    }
}