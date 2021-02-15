import * as React from "react"
import { observer } from "mobx-react"

import { ContainerAwareProps } from "./Container"
import { ColorPegView } from "./pegs/ColorPegView"
import { PegWrapper } from "./pegs/Pegs.styles"
import { SourcePegsViewModel } from "./SourcePegsViewModel"

@observer
export class SourcePegsView extends React.Component<ContainerAwareProps, {}> {
    private model: SourcePegsViewModel

    constructor(props: ContainerAwareProps) {
        super(props)
        this.model = new SourcePegsViewModel()
    }

    render() {
        const pegs = this.model.pegs.map(color => {
            return <ColorPegView color={color} key={color}></ColorPegView>
        })

        return (
            <PegWrapper padding={10} borderRadius={5}>{pegs}</PegWrapper>
        )
    }
}