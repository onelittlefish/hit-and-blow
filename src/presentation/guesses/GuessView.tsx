import * as React from "react"
import { observer } from "mobx-react"

import { GuessViewModel } from "./GuessViewModel"
import { Guess } from "../../logic/GameManager"
import { ContainerAwareProps } from "../Container"
import { ColorPegView } from "../pegs/ColorPegView"
import { ResultPegView } from "../pegs/ResultPegView"
import { GuessWrapper, PegWrapper } from "../pegs/Pegs.styles"

interface Props extends ContainerAwareProps {
  guess: Guess | null
}

@observer
export class GuessView extends React.Component<Props, {}> {
    private model: GuessViewModel

    constructor(props: Props) {
        super(props)
        this.model = new GuessViewModel(props.guess, props.container.gameManager)
    }

    render() {
        const pegs = this.model.pegs.map(peg => {
            return <ColorPegView color={peg[0]} key={peg[1]}></ColorPegView>
        })

        const results = this.model.results.map(result => {
            return <ResultPegView result={result[0]} key={result[1]}></ResultPegView>
        })

        return (
            <GuessWrapper>
                <PegWrapper padding={10} borderRadius={5}>{pegs}</PegWrapper>
                <PegWrapper padding={5} borderRadius={2} width={50}>{results}</PegWrapper>
            </GuessWrapper>
        )
    }
}