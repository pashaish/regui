import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Viewer } from './pages/viewer';
import { createUseStyles } from 'react-jss';
import { colors } from './constants/colors';
import { notifyCreate } from './components/elements/notify';
import { CreateKey } from './pages/create-key';
import { hideMenu } from 'react-contextmenu';
import { Connections } from './pages/connections';
import { connectionID } from '../common';
import { ConnectionEdit } from './pages/connection-edit';

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

document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
        hideMenu();
    }
});

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

const aviableRoutesWithoutConnections = [
    '/connections',
    '/connection-create'
];

export const App = () => {
    const styles = useStyles();

    if (connectionID === -1) {
        if (!aviableRoutesWithoutConnections.includes(location.hash)) {
            location.hash = '/connections';
        }
    }

    return <div ref={refRoot} className={styles.root}>
        <HashRouter>
            <NotifyContainer />
            <Switch>
                <Route exact path="/">
                    <Viewer />
                </Route>
                <Route path="/connections">
                    <Connections />
                </Route>
                <Route path="/connection-create">
                <ConnectionEdit isCreate={true} />
                </Route>
                <Route path="/connection-edit">
                    <ConnectionEdit isCreate={false} />
                </Route>
                <Route path="/add-key">
                    <CreateKey />
                </Route>
            </Switch>
        </HashRouter>
    </div>
}
