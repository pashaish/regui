import React from 'react';
import { useSelector } from 'react-redux';
import { store } from '../reducers';
import { Input } from './elements/input';
import { createUseStyles } from 'react-jss';
import { paddings } from '../constants/colors';
import { HashEditor } from './editor/hash';
import { StringEditor } from './editor/string';
import { ListEditor } from './editor/list';
import { REDIS_TYPES } from '../constants/redis-types';

const useStyles = createUseStyles({
    editor: {
        width: `calc(100% - calc(${paddings.main} * 2))`,
        paddingTop: paddings.main,
        padding: paddings.main,
        height: '100%',
    }
});

const defineEditor = (type: string) => {
    switch(type) {
        case REDIS_TYPES.HASH: return <HashEditor />
        case REDIS_TYPES.STRING: return <StringEditor />
        case REDIS_TYPES.LIST: return <ListEditor />
        default: return '';
    }
}

export const Editor = () => {
    type state = ReturnType<typeof store.getState>;
    const type = useSelector<state, string>(state => state.viewerReducer.type);
    const currentKey = useSelector<state, string>(state => state.viewerReducer.key);
    const styles = useStyles();

    return <div className={styles.editor}>
        <Input readonly={true} value={currentKey} />
        {defineEditor(type)}
    </div>;
}