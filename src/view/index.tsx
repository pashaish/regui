import { App } from './app';
import React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(<>
    <App />
</>, document.querySelector('#root')! as HTMLDivElement);

export {}