import { Color, ColorHelper } from "../../logic/Color";
import { GuessUIManager } from "../guesses/GuessUIManager";

export class SourcePegsViewModel {
    readonly pegs: Color[]
    private guessUIManager: GuessUIManager
    
    constructor(guessUIManager: GuessUIManager) {
        this.guessUIManager = guessUIManager
        this.pegs = ColorHelper.allColors()
    }

    onDrop(color: Color) {
        // Do nothing
    }

    onClick(color: Color) {
        this.guessUIManager.selectColor(color)
    }

    onDelete(id: number) {
        // Do nothing
    }
}