import * as React from 'react'
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

                    <SourcePegsView container={this.props.container} />
                    <SubmitView container={this.props.container} />
                    <GuessesView container={this.props.container} />
                </div>
            </ThemeProvider>
        )
    }
}