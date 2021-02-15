import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RootView } from './RootView'
import { Container } from './Container';

const container = new Container()

ReactDOM.render(<RootView container={container} />, document.getElementById('root'));
