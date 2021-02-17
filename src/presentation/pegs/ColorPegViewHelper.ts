import { Color } from "../../logic/Color";
import { PegColors, Theme } from "../common/Theme.styles";

export class ColorPegViewHelper {
    static getBackgroundColor(color: Color, isSelected: boolean, draggedColor: Color | null): string {
        if (draggedColor != null) {
            return PegColors.getBackgroundColor(draggedColor)
        } else if (isSelected && color == null) {
            return Theme.white
        } else {
            return PegColors.getBackgroundColor(color)
        }
    }

    static getForegroundColor(color: Color) {
        return PegColors.getForegroundColor(color)
    }

    static getLabel(color: Color | null): string {
        return color || ""
    }
}