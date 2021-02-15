import { computed, makeObservable, observable } from "mobx";
import { Color } from "../../logic/Color";
import { PegColors } from "../Theme.styles";

export class ColorPegViewModel {
    readonly color?: Color

    constructor(color?: Color) {
        this.color = color

        makeObservable(this, {
            color: observable,
            backgroundColor: computed,
            foregroundColor: computed,
            label: computed
        })
    }

    get backgroundColor(): string {
        return PegColors.getBackgroundColor(this.color)
    }

    get foregroundColor(): string {
        return PegColors.getForegroundColor(this.color)
    }

    get label(): string {
        return this.color || ""
    }
}