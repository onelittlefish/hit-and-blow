import * as React from "react"
import { observer } from "mobx-react"

import { GuessViewModel } from "./GuessViewModel"
import { Guess } from "../../logic/Guess"
import { ContainerAwareProps } from "../Container"
import { ColorPegView } from "../pegs/ColorPegView"
import { ResultPegView } from "../pegs/ResultPegView"
import { PegsDiv } from "../pegs/Pegs.styles"
import { Button } from "../common/Common.styles"
import { GuessDiv, GuessForm, SuccessView } from "./GuessView.styles"

interface Props extends ContainerAwareProps {
    guess: (Guess | null),
    guessNumber: number
}

@observer
export class GuessView extends React.Component<Props> {
    private model: GuessViewModel

    constructor(props: Props) {
        super(props)
        this.model = new GuessViewModel(props.guess, props.guessNumber, props.container.gameManager, props.container.guessUIManager)
    }

    private onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        this.model.submitGuess()
    }

    render(): JSX.Element {
        const pegs = this.model.pegs.map((peg, index) => {
            return <ColorPegView color={peg[0]} index={index} key={peg[1]}
                isDraggable={false} isDroppable={this.model.isEditable}
                delegate={this.model} isSelected={this.model.selectedPosition == index}></ColorPegView>
        })

        const results = this.model.results.map(result => {
            return <ResultPegView result={result[0]} key={result[1]}></ResultPegView>
        })

        return (
            <GuessDiv>
                <PegsDiv padding={10} borderRadius={5}>{pegs}</PegsDiv>
                <PegsDiv padding={5} borderRadius={2} width={50}>{results}</PegsDiv>
                {this.model.isEditable && 
                    <GuessForm onSubmit={event => this.onSubmit(event)}>
                        <Button type="submit" disabled={!this.model.isSubmitEnabled}>Guess</Button>
                    </GuessForm>
                }
                {this.model.isTarget && 
                    <SuccessView>
                        <span>✓</span>
                    </SuccessView>
                }
            </GuessDiv>
        )
    }
}