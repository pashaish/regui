import React from 'react';
import { useSelector } from '../../reducers';

export const HashEditor = () => {
    const value = useSelector(store => store.viewerReducer.value);
    const keys = Object.keys(JSON.parse(value));

    return <div>
        {keys.map(key => {
            return <div>
                {key}
            </div>
        })}
    </div>;
}