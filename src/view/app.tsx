import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Viewer } from './pages/viewer';

export const App = () => {
    return <HashRouter>
        <Switch>
            <Route path="/"><Viewer /></Route>
        </Switch>
    </HashRouter>
}
