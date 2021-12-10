import React, { useEffect, useState } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../elements/row';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { Split } from '../elements/split';
import { useDispatch } from 'react-redux';
import { editorHashGetFields, editorHashGetValue, editorHashSetViewValue, editorHashUpdate } from '../../actions/editor-hash';

import { EditorArea } from '../editor-area';
import { Button } from '../elements/button';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu } from '../elements/context-menu';
import { redisClient } from '../../../common';
import { getTreeAction } from '../../actions/viewerAction';
import { Input } from '../elements/input';

const useStyles = createUseStyles({
    field: {
        userSelect: 'none',
        cursor: 'pointer',
    },
    selected: {
        backgroundColor: colors.second,
    },
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
    const currentField = useSelector(store => store.editors.editorHashReducer.currentField);
    const key = useSelector(store => store.viewerReducer.key);
    const styles = useStyles();
    const value = useSelector(store => store.editors.editorHashReducer.viewValue);
    const dispatch = useDispatch();
    const [editableFieldIndex, setEditableFieldIndex] = useState(-1);
    const [editValue, setEditValue] = useState('');

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsMenu}>
                <Button>add</Button>

                    {fields.map((field, index) => {
                        return <div key={field}>
                            <ContextMenuTrigger id={`hash-editor-field-${field}`}>
                                {editableFieldIndex === index ?
                                    <Input defaultValue={field} onChange={(e) => setEditValue(e.target.value)} onKeyDown={async (e) => {
                                        if (e.key !== "Enter") {
                                            return;
                                        }

                                        setEditableFieldIndex(-1);

                                        const value = await redisClient.hget(key, field);
                                        if (!value) {
                                            return;
                                        }


                                        const isHsetValid = await redisClient.hset(key, editValue, value);
                                        if (!isHsetValid) {
                                            return;
                                        }

                                        await redisClient.hdel(key, field);

                                        dispatch(editorHashGetFields(key));
                                    }}></Input>
                                    :
                                    <div className={`${styles.field} ${currentField === field ? styles.selected : ''}`} onClick={() => {
                                        dispatch(editorHashGetValue(field))
                                    }} key={field}>
                                        {field}
                                    </div>
                                }
                            </ContextMenuTrigger>
                            <ContextMenu id={`hash-editor-field-${field}`}>
                                <MenuItem
                                    onClick={() => {
                                        setEditableFieldIndex(index);
                                    }}
                                >rename</MenuItem>
                                <MenuItem
                                    onClick={async() => {
                                        await redisClient.hdel(key, field);
                                        dispatch(editorHashGetFields(key));
                                    }}
                                >remove</MenuItem>
                            </ContextMenu>
                        </div>
                    })}
                </div>
                <div className={styles.valueEditor}>
                    <div className={styles.buttons}>
                        <div className={styles.spacer}></div>
                        <Button className={styles.button} onClick={() => dispatch(editorHashUpdate())}>
                            save
                        </Button>
                        <Button className={styles.button} onClick={() => dispatch(editorHashGetValue(currentField))}>
                            refresh
                        </Button>
                    </div>
                    <EditorArea value={value} onChange={(val) => dispatch(editorHashSetViewValue(val))} />
                </div>
            </Split>
        </Row>
    </div>;
}