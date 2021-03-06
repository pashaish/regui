import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editorStringGetValue, editorStringSetValue, editorStringSetViewValue, editorStringStatus, editorStringUpdate } from '../../actions/editor-string';
import { LOADING_STATUS } from '../../constants/loading';
import { useSelector } from '../../reducers';
import { EditorArea } from '../editor-area';
import { createUseStyles } from 'react-jss';
import { notify } from '../../app';
import { Button } from '../elements/button';
import { locale } from '../../locale';

const useStyles = createUseStyles({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        margin: '3px',
    },
    spacer: {
        margin: 'auto',
    },
    setWrapper: {
        height: '100%',
    },
});

export const StringEditor = () => {
    const status = useSelector(s => s.editors.editorStringReducer.status);
    const viewValue = useSelector(s => s.editors.editorStringReducer.viewValue);
    const styles = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === LOADING_STATUS.LOADED) {
            notify({
                title: locale().common.saved,
                time: 2000
            });
            dispatch(editorStringStatus(LOADING_STATUS.NORMAL));
            dispatch(editorStringGetValue());
        }
    }, [status]);

    return <div className={styles.setWrapper}>
        <div className={styles.buttons}>
            <div className={styles.spacer}></div>
            <Button className={styles.button} onClick={() => dispatch(editorStringUpdate(viewValue))}>
                {locale().common.save}
            </Button>
            <Button className={styles.button} onClick={() => dispatch(editorStringGetValue())}>
                {locale().common.refresh}
            </Button>
        </div>
        <EditorArea value={viewValue} readonly={status !== LOADING_STATUS.NORMAL} onChange={(newValue) => {
            dispatch(editorStringSetViewValue(newValue))
        }} />
    </div>
}
