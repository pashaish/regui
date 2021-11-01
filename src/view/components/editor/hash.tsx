import React from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../../constants/colors';
import { Split } from '../split';
import { useDispatch } from 'react-redux';
import { editorHashGetValue } from '../../actions/editor-hash';
import ReactJson from 'react-json-view'


const useStyles = createUseStyles({
    fieldsMenu: {
        padding: '8px',
        minWidth: '32px',
        height: '100%',
        overflow: 'overlay',
        boxShadow: `4px 0px 5px -4px ${colors.separator}`,
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
    const value = useSelector(store => store.editors.editorHashReducer.value);
    const dispatch = useDispatch();
    let jsonValue: object | null;
    try {
        jsonValue = JSON.parse(value);
    } catch (error) {
        jsonValue = null;
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
                    {
                        jsonValue ?
                            <ReactJson onEdit={() => {}} theme="twilight" style={{backgroundColor: 'transparent'}} src={jsonValue} /> :
                            <div>{value}</div>
                    }
                </div>
            </Split>
        </Row>
    </div>;
}