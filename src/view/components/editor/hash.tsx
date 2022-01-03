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
import { Input } from '../elements/input';
import { List } from '../list';
import { locale } from '../../locale';

const useStyles = createUseStyles({
    fields: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
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
    let editValue = '';
    const items = fields.map((f) => ({
        value: f,
        key: f,
    }));

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fields}>
                    <Button onClick={async () => {
                        let ind = 0;
                        while (await redisClient().hget(key, `new_field_${ind}`)) {
                            ind++;
                        }
                        await redisClient().hset(key, `new_field_${ind}`, 'value');

                        dispatch(editorHashGetFields(key));
                        dispatch(editorHashGetValue(`new_field_${ind}`));
                    }}>{locale().common.add}</Button>
                    <List
                        item={items.find((i) => i.value === currentField)}
                        items={items}
                        contextMenu={[
                            {
                                value: locale().common.remove,
                                onClick: async (item) => {
                                    await redisClient().hdel(key, item.value);
                                    dispatch(editorHashGetFields(key));
                                }
                            }
                        ]}
                        onChangeItem={(item) => {
                            dispatch(editorHashGetValue(item.value));
                        }}
                        onKeyDownEditableInput={async (e, item) => {
                            const isHsetValid = await redisClient().hset(key, editValue, value);
                            if (!isHsetValid) {
                                return;
                            }

                            await redisClient().hdel(key, item.value);
 
                            dispatch(editorHashGetFields(key));
                        }}
                        onEditValue={(value) => {
                            editValue = value;
                        }}
                    />
                </div>
                <div className={styles.valueEditor}>
                    <div className={styles.buttons}>
                        <div className={styles.spacer}></div>
                        <Button className={styles.button} onClick={() => dispatch(editorHashUpdate())}>
                            {locale().common.save}
                        </Button>
                        <Button className={styles.button} onClick={() => dispatch(editorHashGetValue(currentField))}>
                            {locale().common.refresh}
                        </Button>
                    </div>
                    <EditorArea value={value} onChange={(val) => dispatch(editorHashSetViewValue(val))} />
                </div>
            </Split>
        </Row>
    </div>;
}