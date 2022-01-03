import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../elements/row';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../../constants/colors';
import { Split } from '../elements/split';
import { useDispatch } from 'react-redux';

import { EditorArea } from '../editor-area';
import { editorZSetGetValues, editorZSetSetValue, editorZSetSetViewValue, editorZSetUpdate } from '../../actions/editor-zset';
import { Button } from '../elements/button';
import { redisClient } from '../../../common';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu } from '../elements/context-menu';
import { List } from '../list';
import { Input } from '../elements/input';

const useStyles = createUseStyles({
    fieldsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: paddings.second,
    },
    sizeInput: {
        width: '50px',
        height: '16px',
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
        padding: `${paddings.second}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25px',
    },
    button: {
        margin: '3px',
    },
    spacer: {
        margin: 'auto',
    },
});

export const ZSetEditor = () => {
    const values = useSelector(store => store.editors.editorZSetReducer.values);
    const currentValue = useSelector(store => store.editors.editorZSetReducer.currentValue);
    const styles = useStyles();
    const currentKey = useSelector(store => store.viewerReducer.key);
    const viewValue = useSelector(store => store.editors.editorZSetReducer.viewValue);
    const dispatch = useDispatch();
    const items = values.map(([mass, value]) => ({
        value,
        key: value,
        mass,
        viewValue: `${mass} ${value}`,
    }));

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsWrapper}>
                    <Button onClick={async () => {
                        await redisClient().zadd(currentKey, 0, 'new_value');
                        dispatch(editorZSetGetValues(currentKey));

                        dispatch(editorZSetSetValue('new_value', '0'));
                    }}>
                        add
                    </Button>
                    <List
                        item={items.find((i) => i.value === currentValue[1])}
                        items={items}
                        onChangeItem={(item) => dispatch(editorZSetSetValue(item.value, item.mass))}
                        contextMenu={[
                            {
                                value: 'remove',
                                onClick: async (item) => {
                                    await redisClient().zrem(currentKey, item.value);
                                    dispatch(editorZSetGetValues(currentKey));
                                }
                            },
                        ]}
                    />
                </div>
                <div className={styles.valueEditor}>
                    <div className={styles.buttons}>
                        <Input
                            className={styles.sizeInput}
                            placeholder="mass"
                            value={viewValue[0].toString()}
                            onChange={(e) => {
                                dispatch(editorZSetSetViewValue(viewValue[1], e.target.value))
                            }}
                        />
                        <div className={styles.spacer}></div>
                        <Button className={styles.button} onClick={() => dispatch(editorZSetUpdate())}>
                            save
                        </Button>
                        <Button className={styles.button} onClick={() => dispatch(editorZSetGetValues(currentKey))}>
                            refresh
                        </Button>
                    </div>
                    <EditorArea value={viewValue[1]} onChange={(newValue) => dispatch(editorZSetSetViewValue(newValue, viewValue[0]))} />
                </div>
            </Split>
        </Row>
    </div>;
}