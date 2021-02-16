import { computed, makeObservable, observable } from "mobx";
import { Result } from "../guesses/Result";
import { PegColors } from "../common/Theme.styles";

export class ResultPegViewModel {
    readonly result: (Result | null)

    constructor(color: (Result | null)) {
        this.result = color

        makeObservable(this, {
            result: observable,
            backgroundColor: computed,
            foregroundColor: computed,
            label: computed
        })
    }

    get backgroundColor(): string {
        return PegColors.getBackgroundColorForResult(this.result)
    }

    get foregroundColor(): string {
        return PegColors.getForegroundColorForResult(this.result)
    }

    get label(): string {
        return this.result || ""
    }
}