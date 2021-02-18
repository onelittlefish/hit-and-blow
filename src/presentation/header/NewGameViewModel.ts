import { GameManager } from "../../logic/GameManager"

export class NewGameViewModel {
    private gameManager: GameManager

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager
    }
    
    newGame(): void {
        this.gameManager.newGame()
    }
}