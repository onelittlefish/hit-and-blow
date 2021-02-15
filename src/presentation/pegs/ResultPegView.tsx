import * as React from "react"
import { observer } from "mobx-react"
import { ResultPeg } from "./Pegs.styles"
import { Result } from "../guesses/Result"
import { ResultPegViewModel } from "./ResultPegViewModel"

interface Props {
  result: (Result | null)
}

@observer
export class ResultPegView extends React.Component<Props, {}> {
    private model: ResultPegViewModel

    constructor(props: Props) {
        super(props)
        this.model = new ResultPegViewModel(props.result)
    }

    render() {
        return (
            <ResultPeg backgroundColor={this.model.backgroundColor} color={this.model.foregroundColor}>
                {this.model.label}
            </ResultPeg>
        )
    }
}