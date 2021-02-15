import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ThemeProvider } from 'styled-components'
import { ContainerAwareProps } from './Container'
import { GuessesView } from './guesses/GuessesView'
import { SourcePegsView } from './SourcePegsView'
import { SubmitView } from './SubmitView'
import { Theme } from './Theme.styles'

export class RootView extends React.Component<ContainerAwareProps, {}> {
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <div id="content">
                    <h1>Hit and Blow</h1>

                    <SubmitView container={this.props.container} />
                    
                    <DndProvider backend={HTML5Backend}>
                        <SourcePegsView container={this.props.container} />
                        <GuessesView container={this.props.container} />
                    </DndProvider>
                </div>
            </ThemeProvider>
        )
    }
}