import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editorSetGetValue, editorSetSetValue, editorSetStatus, editorSetUpdate } from '../../actions/editor-set';
import { LOADING_STATUS } from '../../constants/loading';
import { useSelector } from '../../reducers';
import { EditorArea } from '../editor-area';
import { createUseStyles } from 'react-jss';
import { notify } from '../../app';

const useStyles = createUseStyles({
    setWrapper: {
        height: '100%',
    }
});

export const SetEditor = () => {
    const value = useSelector(s => s.editors.editorSetReducer.value);
    const status = useSelector(s => s.editors.editorSetReducer.status);
    const styles = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === LOADING_STATUS.LOADED) {
            notify({
                title: "title",
            });
            dispatch(editorSetStatus(LOADING_STATUS.NORMAL));
            dispatch(editorSetGetValue());
        }
    }, [status]);

    return <div className={styles.setWrapper}>
        {status}
        <EditorArea value={value} readonly={status !== LOADING_STATUS.NORMAL} onChange={(newValue) => {
            dispatch(editorSetUpdate(newValue));
        }} />
    </div>
}