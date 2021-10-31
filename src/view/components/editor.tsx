import React from 'react';
import { useSelector } from 'react-redux';
import { store } from '../reducers';
import { Input } from './input';
import { createUseStyles } from 'react-jss';
import { paddings } from '../constants/colors';
import { HashEditor } from './editor/hash';

const useStyles = createUseStyles({
    editor: {
        width: '100%',
        paddingTop: paddings.main,
        padding: paddings.main,
    }
});

const defineEditor = (type: string) => {
    switch(type) {
        case 'hash': return <HashEditor />
        default: return '';
    }
}

export const Editor = () => {
    type state = ReturnType<typeof store.getState>;
    const value = useSelector<state, string>(state => state.viewerReducer.value);
    const type = useSelector<state, string>(state => state.viewerReducer.valueType);
    const currentKey = useSelector<state, string>(state => state.viewerReducer.currentKey);
    const styles = useStyles();

    return <div className={styles.editor}>
        <Input value={currentKey} />
        {defineEditor(type)}
    </div>;
}