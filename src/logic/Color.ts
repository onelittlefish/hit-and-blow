export enum Color {
    Red = "R",
    Blue = "B",
    Green = "G",
    Yellow = "Y",
    Pink = "P",
    White = "W"
}

export class ColorHelper {
    static allColors(): Color[] {
        return Object.keys(Color).map((color: keyof typeof Color) => Color[color])
    }
}
