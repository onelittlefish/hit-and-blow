import * as React from "react"
import { observer } from "mobx-react"
import { ContainerAwareProps } from "../Container"
import { NewGameViewModel } from "./NewGameViewModel"
import { Button } from "../common/Common.styles"
import { NewGameDiv } from "./NewGameView.styles"

@observer
export class NewGameView extends React.Component<ContainerAwareProps> {
    private model: NewGameViewModel

    constructor(props: ContainerAwareProps) {
        super(props)
        this.model = new NewGameViewModel(props.container.gameManager)
    }

    private onNewGame(event: React.SyntheticEvent) {
        event.preventDefault()
        this.model.newGame()
    }

    render(): JSX.Element {
        return (
            <NewGameDiv>
                <form onSubmit={event => this.onNewGame(event)}>
                    <Button type = "submit">New Game</Button>
                </form>
            </NewGameDiv>
        )
    }
}