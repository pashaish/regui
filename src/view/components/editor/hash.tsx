import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { Split } from '../split';
import { useDispatch } from 'react-redux';
import { editorHashGetValue, editorHashSetViewValue, editorHashUpdate } from '../../actions/editor-hash';

import { EditorArea } from '../editor-area';
import { Button } from '../button';

const useStyles = createUseStyles({
    fieldsMenu: {
        padding: '8px',
        minWidth: '32px',
        height: '100%',
        overflow: 'overlay',
        boxShadow: `4px 0px 5px -4px ${colors.separator}`,
    },
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
    ace: {
        backgroundColor: 'transparent',
    },
    valueEditor: {
        overflow: 'overlay',
        height: '100%',
    },
    wrapper: {
        height: '100%'
    },
});

export const HashEditor = () => {
    const fields = useSelector(store => store.editors.editorHashReducer.fields);
    const field = useSelector(store => store.editors.editorHashReducer.currentField);
    const styles = useStyles();
    const value = useSelector(store => store.editors.editorHashReducer.viewValue);
    const dispatch = useDispatch();

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsMenu}>
                    {fields.map(field => {
                        return <div onClick={() => dispatch(editorHashGetValue(field))} key={field}>
                            {field}
                        </div>
                    })}
                </div>
                <div className={styles.valueEditor}>
                    <div className={styles.buttons}>
                        <div className={styles.spacer}></div>
                        <Button className={styles.button} onClick={() => dispatch(editorHashUpdate())}>
                            save
                        </Button>
                        <Button className={styles.button} onClick={() => dispatch(editorHashGetValue(field))}>
                            refresh
                        </Button>
                    </div>
                    <EditorArea value={value} onChange={(val) => dispatch(editorHashSetViewValue(val))} />
                </div>
            </Split>
        </Row>
    </div>;
}