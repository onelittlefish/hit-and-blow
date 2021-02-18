import * as React from "react"
import { observer } from "mobx-react"
import { ResultPeg } from "./ResultPegView.styles"
import { Result } from "../guesses/Result"
import { ResultPegViewHelper } from "./ResultPegViewHelper"

interface Props {
  result: (Result | null)
}

@observer
export class ResultPegView extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render(): JSX.Element {
        const backgroundColor = ResultPegViewHelper.getBackgroundColor(this.props.result)
        const foregroundColor = ResultPegViewHelper.getForegroundColor(this.props.result)
        const label = ResultPegViewHelper.getLabel(this.props.result)

        return (
            <ResultPeg backgroundColor={backgroundColor} color={foregroundColor}>
                {label}
            </ResultPeg>
        )
    }
}