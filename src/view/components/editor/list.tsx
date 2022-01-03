import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../elements/row';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../../constants/colors';
import { Split } from '../elements/split';
import { useDispatch } from 'react-redux';

import { EditorArea } from '../editor-area';
import { editorListGetValues, editorListSetIndex, editorListSetViewValue, editorListUpdate } from '../../actions/editor-list';
import { Button } from '../elements/button';
import { redisClient } from '../../../common';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu } from '../elements/context-menu';
import { List } from '../list';

const useStyles = createUseStyles({
    fieldsWrapper: {
        display: 'flex',
        padding: paddings.second,
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
    const currentIndex = useSelector(store => store.editors.editorListReducer.currentIndex);
    const styles = useStyles();
    const currentKey = useSelector(store => store.viewerReducer.key);
    const viewValue = useSelector(store => store.editors.editorListReducer.viewValue);
    const dispatch = useDispatch();
    const items = values.map(([index, value]) => ({
        value,
        key: index.toString(),
    }));

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsWrapper}>
                    <Button onClick={async () => {
                        await redisClient().lpush(currentKey, 'new_value');
                        dispatch(editorListGetValues());

                        dispatch(editorListSetIndex(0));
                    }}>
                        add
                    </Button>
                    <List
                        item={items.find((i) => i.key === currentIndex.toString())}
                        items={items}
                        onChangeItem={(item) => dispatch(editorListSetIndex(Number(item.key)))}
                        contextMenu={[
                            {
                                value: 'remove',
                                onClick: async (item) => {
                                    await redisClient().lrem(currentKey, 1, item.value);
                                    dispatch(editorListGetValues());
                                }
                            }
                        ]}
                    />
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