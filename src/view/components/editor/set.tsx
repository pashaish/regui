import React from 'react';
import { useSelector } from '../../reducers';
import { EditorArea } from '../editor-area';

export const SetEditor = () => {
    const value = useSelector(s => s.editors.editorSetReducer.value);
    return <EditorArea value={value} />
}