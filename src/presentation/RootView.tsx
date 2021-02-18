import * as React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ThemeProvider } from "styled-components"
import { ContainerAwareProps } from "./Container"
import { GuessesView } from "./guesses/GuessesView"
import { RootDiv } from "./RootView.styles"
import { SourcePegsView } from "./pegs/SourcePegsView"
import { NewGameView } from "./header/NewGameView"
import { Theme } from "./common/Theme.styles"

export class RootView extends React.Component<ContainerAwareProps> {
    render(): JSX.Element {
        return (
            <ThemeProvider theme={Theme}>
                <RootDiv>
                    <h1>Hit and Blow</h1>

                    <NewGameView container={this.props.container} />
                    
                    <DndProvider backend={HTML5Backend}>
                        <SourcePegsView container={this.props.container} />
                        <GuessesView container={this.props.container} />
                    </DndProvider>
                </RootDiv>
            </ThemeProvider>
        )
    }
}