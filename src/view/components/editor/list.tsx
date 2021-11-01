import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { Split } from '../split';
import { useDispatch } from 'react-redux';
import { editorHashGetValue } from '../../actions/editor-hash';

import { EditorArea } from '../editor-area';
import { editorListSetIndex } from '../../actions/editor-list';

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
});

export const ListEditor = () => {
    const values = useSelector(store => store.editors.editorListReducer.values);
    const styles = useStyles();
    let currentValue = useSelector(store => store.editors.editorListReducer.currentValue);
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
                    <EditorArea value={currentValue} />
                </div>
            </Split>
        </Row>
    </div>;
}