import * as React from "react"
import { observer } from "mobx-react"
import { ColorPegViewModel } from "./ColorPegViewModel"
import { Color } from "../../logic/Color"
import { ColorPeg } from "./Pegs.styles"

interface Props {
  color?: Color
}

@observer
export class ColorPegView extends React.Component<Props, {}> {
    private model: ColorPegViewModel

    constructor(props: Props) {
        super(props)
        this.model = new ColorPegViewModel(props.color)
    }

    render() {
        return (
            <ColorPeg backgroundColor={this.model.backgroundColor} color={this.model.foregroundColor}>
                {this.model.label}
            </ColorPeg>
        )
    }
}