import { Color } from "../logic/Color";
import { Result } from "./guesses/Result";

export const Theme = {
    red: "#e6261f",
    blue: "#186de2",
    green: "#72be01",
    yellow: "#f7d038",
    pink: "#ec9af8",
    orange: "#eb7532",
    grey: "#eee",
    darkGrey: "#555",
    black: "black",
    white: "white"
};

export class PegColors {
    static getBackgroundColor(color?: Color): string {
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
    static getBackgroundColorForResult(result?: Result): string {
        switch (result) {
            case Result.Hit:
                return Theme.orange
            case Result.Blow:
                return Theme.white
            default:
                return Theme.darkGrey
        }
    }

    static getForegroundColor(color?: Color): string {
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

    static getForegroundColorForResult(result?: Result): string {
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
