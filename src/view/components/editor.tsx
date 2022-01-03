import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../reducers';
import { Input } from './elements/input';
import { createUseStyles } from 'react-jss';
import { paddings } from '../constants/colors';
import { HashEditor } from './editor/hash';
import { StringEditor } from './editor/string';
import { ListEditor } from './editor/list';
import { REDIS_TYPES } from '../constants/redis-types';
import { SetEditor } from './editor/set';
import { ZSetEditor } from './editor/zset';
import { Row } from './elements/row';
import { Button } from './elements/button';
import { viewerActionGetTTL, viewerActionSetTTL } from '../actions/viewerAction';
import { redisClient } from '../../common';

const useStyles = createUseStyles({
    ttlInput: {
        width: '80px',
    },
    editor: {
        width: `calc(100% - calc(${paddings.main} * 2))`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    inputs: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            margin: paddings.second,
        }
    },
});

const defineEditor = (type: string) => {
    switch(type) {
        case REDIS_TYPES.HASH: return <HashEditor />
        case REDIS_TYPES.STRING: return <StringEditor />
        case REDIS_TYPES.LIST: return <ListEditor />
        case REDIS_TYPES.SET: return <SetEditor />
        case REDIS_TYPES.ZSET: return <ZSetEditor />
        default: return '';
    }
}

export const Editor = () => {
    type state = ReturnType<typeof store.getState>;
    const type = useSelector<state, string>(state => state.viewerReducer.type);
    const currentKey = useSelector<state, string>(state => state.viewerReducer.key);
    const realTTL = useSelector<state, string>(state => state.viewerReducer.ttl);
    const dispatch = useDispatch();
    const styles = useStyles();
    
    if (!realTTL) {
        dispatch(viewerActionGetTTL());
    }
    
    return <div className={styles.editor}>
        <div className={styles.inputs}>
            <Input readonly={true} value={currentKey} />
            <Input value={realTTL} className={styles.ttlInput} onChange={async (newvalue) => {
                dispatch(viewerActionSetTTL(newvalue.target.value));
            }} />
            <Button onClick={async () => {
                const ttl = Number(realTTL);

                if (!isNaN(ttl)) {
                    await redisClient().expire(currentKey, ttl);
                    dispatch(viewerActionGetTTL());
                }
            }}>save</Button>
            <Button onClick={() => {
                dispatch(viewerActionGetTTL());
            }}>refresh</Button>
        </div>
        {defineEditor(type)}
    </div>;
}