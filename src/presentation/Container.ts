import { GameManager } from "../logic/GameManager";
import { GuessUIManager } from "./guesses/GuessUIManager";

export class Container {
    readonly gameManager: GameManager
    readonly guessUIManager: GuessUIManager

    constructor() {
        this.gameManager = new GameManager()
        this.guessUIManager = new GuessUIManager(this.gameManager)
    }
}

export interface ContainerAwareProps {
    container: Container
}