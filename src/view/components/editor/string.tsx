import React from 'react';
import { useSelector } from '../../reducers';
import { EditorArea } from '../editor-area';

export const StringEditor = () => {
    const value = useSelector(s => s.viewerReducer.value);
    return <EditorArea value={value} />
}