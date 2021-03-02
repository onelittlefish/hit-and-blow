import { Result } from "../guesses/Result"
import { PegColors } from "../common/Theme.styles"

export class ResultPegViewHelper {
    static getBackgroundColor(result: Result | null): string {
        return PegColors.getBackgroundColorForResult(result)
    }

    static getForegroundColor(result: Result | null): string {
        return PegColors.getForegroundColorForResult(result)
    }

    static getLabel(result: Result | null): string {
        return result || ""
    }
}