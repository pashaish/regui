import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Viewer } from './pages/viewer';
import { createUseStyles } from 'react-jss';
import { colors } from './constants/colors';

const useStyles = createUseStyles({
    root: {
        backgroundColor: colors.main,
        fontFamily: 'monospace',
        fontSize: '16px',
        color: colors.font,
    }
});

export const App = () => {
    const styles = useStyles();

    return <div className={styles.root}>
        <HashRouter>
            <Switch>
                <Route path="/"><Viewer /></Route>
            </Switch>
        </HashRouter>
    </div>
}
