import * as React from "react"
import { observer } from "mobx-react";
import { ContainerAwareProps } from "./Container";
import { SubmitViewModel } from "./SubmitViewModel";
import { Button } from "./common/Common.styles";
import { SubmitViewWrapper } from "./SubmitView.styles";

@observer
export class SubmitView extends React.Component<ContainerAwareProps, {}> {
    private model: SubmitViewModel

    constructor(props: ContainerAwareProps) {
        super(props)
        this.model = new SubmitViewModel(props.container.gameManager)
    }

    private onNewGame(event: React.SyntheticEvent<any, any>) {
        event.preventDefault()
        this.model.newGame()
    }

    render() {
        return (
            <SubmitViewWrapper>
                <form onSubmit={event => this.onNewGame(event)}>
                    <Button type = "submit">New Game</Button>
                </form>
            </SubmitViewWrapper>
        )
    }
}