import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editorSetGetValue, editorSetSetValue, editorSetSetViewValue, editorSetStatus, editorSetUpdate } from '../../actions/editor-set';
import { LOADING_STATUS } from '../../constants/loading';
import { useSelector } from '../../reducers';
import { EditorArea } from '../editor-area';
import { createUseStyles } from 'react-jss';
import { notify } from '../../app';
import { colors } from '../../constants/colors';

const useStyles = createUseStyles({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    spacer: {
        margin: 'auto',
    },
    setWrapper: {
        height: '100%',
    },
    button: {
        cursor: 'pointer',
        userSelect: 'none',
        padding: '3px',
        margin: '3px',
        border: `1px solid ${colors.second}`,
        '&:hover': {
            backgroundColor: colors.second,
        },
    },
    refresh: {
        cursor: 'pointer',
        userSelect: 'none',
        padding: '3px',
    }
});

export const SetEditor = () => {
    const status = useSelector(s => s.editors.editorSetReducer.status);
    const viewValue = useSelector(s => s.editors.editorSetReducer.viewValue);
    const styles = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === LOADING_STATUS.LOADED) {
            notify({
                title: "saved",
                time: 2000
            });
            dispatch(editorSetStatus(LOADING_STATUS.NORMAL));
            dispatch(editorSetGetValue());
        }
    }, [status]);

    return <div className={styles.setWrapper}>
        <div className={styles.buttons}>
            <div className={styles.spacer}></div>
            <div className={styles.button} onClick={() => dispatch(editorSetUpdate(viewValue))}>save</div>
            <div className={styles.button} onClick={() => dispatch(editorSetGetValue())}>refresh</div>
        </div>
        <EditorArea value={viewValue} readonly={status !== LOADING_STATUS.NORMAL} onChange={(newValue) => {
            dispatch(editorSetSetViewValue(newValue))
        }} />
    </div>
}
