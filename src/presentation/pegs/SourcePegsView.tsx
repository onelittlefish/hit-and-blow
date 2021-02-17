import * as React from "react"
import { observer } from "mobx-react"

import { ContainerAwareProps } from "../Container"
import { ColorPegView } from "./ColorPegView"
import { SourcePegsDiv } from "./SourcePegsView.styles"
import { SourcePegsViewModel } from "./SourcePegsViewModel"

@observer
export class SourcePegsView extends React.Component<ContainerAwareProps, {}> {
    private model: SourcePegsViewModel

    constructor(props: ContainerAwareProps) {
        super(props)
        this.model = new SourcePegsViewModel(props.container.guessUIManager)
    }

    render() {
        const pegs = this.model.pegs.map((color, index) => {
            return <ColorPegView color={color} index={index} key={color}
                isDraggable={true} isDroppable={false}
                delegate={this.model} isSelected={false}/>
        })

        return (
            <SourcePegsDiv padding={10} borderRadius={5}>{pegs}</SourcePegsDiv>
        )
    }
}