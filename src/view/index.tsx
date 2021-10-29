import { App } from './app';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './reducers/index';
import { Provider } from 'react-redux';

ReactDOM.render(<>
    <Provider store={store}>
        <App />
    </Provider>
</>, document.querySelector('#root')! as HTMLDivElement);

export {}