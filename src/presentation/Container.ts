import { GameManager } from "../logic/GameManager";

export class Container {
    readonly gameManager: GameManager

    constructor() {
        this.gameManager = new GameManager()
    }
}

export interface ContainerAwareProps {
    container: Container
}