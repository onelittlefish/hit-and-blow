import { GameManager } from "../logic/GameManager";

export class SubmitViewModel {
    private gameManager: GameManager

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager
    }
    
    newGame() {
        this.gameManager.newGame()
    }
}