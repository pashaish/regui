import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { Split } from '../split';
import { useDispatch } from 'react-redux';
import { editorHashGetValue } from '../../actions/editor-hash';

import { EditorArea } from '../editor-area';

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

export const HashEditor = () => {
    const fields = useSelector(store => store.editors.editorHashReducer.fields);
    const styles = useStyles();
    let value = useSelector(store => store.editors.editorHashReducer.value);
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
                    <EditorArea value={value} />
                </div>
            </Split>
        </Row>
    </div>;
}