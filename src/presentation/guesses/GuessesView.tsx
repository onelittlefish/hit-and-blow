import * as React from "react"
import { observer } from "mobx-react"

import { GuessesViewModel } from "./GuessesViewModel"
import { GuessView } from "./GuessView"
import { ContainerAwareProps } from "../Container"

@observer
export class GuessesView extends React.Component<ContainerAwareProps, {}> {
    private model: GuessesViewModel

    constructor(props: ContainerAwareProps) {
        super(props)
        this.model = new GuessesViewModel(props.container.gameManager)
    }

    render() {
        const guessViews = this.model.guesses.map((guessAndKey, index) => {
            return <GuessView guess={guessAndKey[0]} guessNumber={index} key={guessAndKey[1]} container={this.props.container} />
        })

        return (
            <div>
                {guessViews}
            </div>
        )
    }
}