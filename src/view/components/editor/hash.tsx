import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../../constants/colors';
import { Split } from '../split';
import { useDispatch } from 'react-redux';
import { editorHashGetValue } from '../../actions/editor-hash';
import ReactJson from 'react-json-view'
import ReactAce from 'react-ace';

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

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

    try {
        const jsonValue = JSON.parse(value);
        value = JSON.stringify(jsonValue, null, 2);
    } catch (error) {
        //
    }

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
                    <ReactAce height="95%" width="100%" wrapEnabled={true} showGutter={true} mode="json" theme="monokai" value={value} className={styles.ace} />
                </div>
            </Split>
        </Row>
    </div>;
}