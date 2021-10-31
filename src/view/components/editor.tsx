import React from 'react';
import { useSelector } from 'react-redux';
import { store } from '../reducers';

export const Editor = () => {
    type state = ReturnType<typeof store.getState>;
    const value = useSelector<state, string>(state => state.viewerReducer.value);
    const type = useSelector<state, string>(state => state.viewerReducer.type);
    const currentKey = useSelector<state, string>(state => state.viewerReducer.currentKey);
    return <div>
        {value}
    </div>;
}