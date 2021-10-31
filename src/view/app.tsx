import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Viewer } from './pages/viewer';
import { store } from './reducers';

export const App = () => {
    return <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/"><Viewer /></Route>
            </Switch>
        </HashRouter>
    </Provider>
}