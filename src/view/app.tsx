import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Viewer } from './pages/viewer';
import { createUseStyles } from 'react-jss';
import { colors } from './constants/colors';
import { notifyCreate } from './components/notify';

const useStyles = createUseStyles({
    root: {
        backgroundColor: colors.main,
        fontFamily: 'monospace',
        fontSize: '16px',
        color: colors.font,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});

let refRoot = React.createRef<HTMLDivElement>();

export const toggleSelectionApp = (isSelection: boolean) => {
    const { current } = refRoot;
    if (current) {
        current.style.userSelect = isSelection ? '' : 'none';
    }
}

export const toggleCursorApp = (cursor: string) => {
    const { current } = refRoot;
    if (current) {
        current.style.cursor = cursor;
    }
}

export const { NotifyContainer, notify } = notifyCreate();

export const App = () => {
    const styles = useStyles();

    return <div ref={refRoot} className={styles.root}>
        <HashRouter>
            <NotifyContainer />
            <Switch>
                <Route path="/"><Viewer /></Route>
            </Switch>
        </HashRouter>
    </div>
}
