import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { Split } from '../split';
import { useDispatch } from 'react-redux';

import { EditorArea } from '../editor-area';
import { editorListGetValues, editorListSetIndex, editorListSetViewValue, editorListUpdate } from '../../actions/editor-list';
import { Button } from '../button';

const useStyles = createUseStyles({
    fieldsMenu: {
        padding: '8px',
        minWidth: '32px',
        height: '100%',
        overflow: 'overlay',
        boxShadow: `4px 0px 5px -4px ${colors.separator}`,
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
});

export const ListEditor = () => {
    const values = useSelector(store => store.editors.editorListReducer.values);
    const styles = useStyles();
    const value = useSelector(store => store.editors.editorListReducer.viewValue);
    const dispatch = useDispatch();

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsMenu}>
                    {values.map((value, index) => {
                        return <div onClick={() => dispatch(editorListSetIndex(index))} key={value}>
                            {value}
                        </div>
                    })}
                </div>
                <div className={styles.valueEditor}>
                    <div className={styles.buttons}>
                        <div className={styles.spacer}></div>
                        <Button className={styles.button} onClick={() => dispatch(editorListUpdate())}>
                            save
                        </Button>
                        <Button className={styles.button} onClick={() => dispatch(editorListGetValues())}>
                            refresh
                        </Button>
                    </div>
                    <EditorArea value={value} onChange={(newValue) => dispatch(editorListSetViewValue(newValue))} />
                </div>
            </Split>
        </Row>
    </div>;
}