import { Color } from "./Color"

export class Guess {
    readonly id: string
    readonly guess: Color[]
    readonly hits: number
    readonly blows: number

    constructor(id: string, guess: Color[], hits: number, blows: number) {
        this.id = id
        this.guess = guess
        this.hits = hits
        this.blows = blows
    }
}
