import { Color } from "../../logic/Color"
import { Result } from "../guesses/Result"

export const Theme = {
    red: "#e6261f",
    blue: "#186de2",
    green: "#72be01",
    yellow: "#f7d038",
    pink: "#ec9af8",
    orange: "#eb7532",
    lightGrey: "#eee",
    grey: "#bbb",
    darkGrey: "#999",
    black: "#000",
    white: "#fff"
}

export class PegColors {
    static getBackgroundColor(color: (Color | null)): string {
        switch (color) {
            case Color.Red:
                return Theme.red
            case Color.Blue:
                return Theme.blue
            case Color.Green:
                return Theme.green
            case Color.Yellow:
                return Theme.yellow
            case Color.Pink:
                return Theme.pink
            case Color.White:
                return Theme.white
            default:
                return Theme.darkGrey
        }
    }
    static getBackgroundColorForResult(result: (Result | null)): string {
        switch (result) {
            case Result.Hit:
                return Theme.orange
            case Result.Blow:
                return Theme.white
            default:
                return Theme.darkGrey
        }
    }

    static getForegroundColor(color: (Color | null)): string {
        switch (color) {
            case Color.Red:
            case Color.Blue:
                return Theme.white
            case Color.Green:
            case Color.Yellow:
            case Color.Pink:
            case Color.White:
                return Theme.black
            default:
                return Theme.darkGrey
        }
    }

    static getForegroundColorForResult(result: (Result | null)): string {
        switch (result) {
            case Result.Hit:
                return Theme.white
            case Result.Blow:
                return Theme.black
            default:
                return Theme.darkGrey
        }
    }
}
