import { Color, ColorHelper } from "../../logic/Color"
import { GuessUIManager } from "../guesses/GuessUIManager"
import { ColorPegViewDelegate } from "./ColorPegView"

export class SourcePegsViewModel implements ColorPegViewDelegate {
    readonly pegs: Color[]
    private guessUIManager: GuessUIManager
    
    constructor(guessUIManager: GuessUIManager) {
        this.guessUIManager = guessUIManager
        this.pegs = ColorHelper.allColors()
    }

    onDrop(_color: Color, _id: number): void {
        // Do nothing
    }

    onClick(color: Color, _id: number): void {
        this.guessUIManager.selectColor(color)
    }

    onDelete(_id: number): void {
        // Do nothing
    }

}