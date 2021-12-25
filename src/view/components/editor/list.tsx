import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../elements/row';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { Split } from '../elements/split';
import { useDispatch } from 'react-redux';

import { EditorArea } from '../editor-area';
import { editorListGetValues, editorListSetIndex, editorListSetViewValue, editorListUpdate } from '../../actions/editor-list';
import { Button } from '../elements/button';
import { redisClient } from '../../../common';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu } from '../elements/context-menu';

const useStyles = createUseStyles({
    fieldsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
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
    const currentKey = useSelector(store => store.viewerReducer.key);
    const viewValue = useSelector(store => store.editors.editorListReducer.viewValue);

    const dispatch = useDispatch();

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsWrapper}>
                    <Button onClick={async () => {
                        await redisClient.lpush(currentKey, 'new_value');
                        dispatch(editorListGetValues());

                        dispatch(editorListSetIndex(0));
                    }}>
                        add
                    </Button>
                    <div className={styles.fieldsMenu}>
                        {values.map(([index, value]) => {
                            return <div key={index + value}>
                                <div onClick={() => dispatch(editorListSetIndex(index))} key={value}>
                                    <ContextMenuTrigger id={`hash-editor-field-${value}${index}`}>
                                        <b>{index}</b> {value}
                                    </ContextMenuTrigger>
                                </div>
                                <ContextMenu id={`hash-editor-field-${value}${index}`}>
                                    <MenuItem
                                        onClick={async () => {
                                            await redisClient.lrem(currentKey, 1, value);
                                            dispatch(editorListGetValues());
                                        }}
                                    >remove</MenuItem>
                                </ContextMenu>
                            </div>
                        })}
                    </div>
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
                    <EditorArea value={viewValue} onChange={(newValue) => dispatch(editorListSetViewValue(newValue))} />
                </div>
            </Split>
        </Row>
    </div>;
}