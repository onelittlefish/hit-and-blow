import { Color, ColorHelper } from "../logic/Color";

export class SourcePegsViewModel {
    readonly pegs: Color[]
    
    constructor() {
        this.pegs = ColorHelper.allColors()
    }
}