import React, { useEffect } from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../elements/row';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../../constants/colors';
import { Split } from '../elements/split';
import { useDispatch } from 'react-redux';

import { EditorArea } from '../editor-area';
import { editorSetGetValues, editorSetSetValue, editorSetSetViewValue, editorSetUpdate } from '../../actions/editor-set';
import { Button } from '../elements/button';
import { redisClient } from '../../../common';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu } from '../elements/context-menu';
import { List } from '../list';
import { locale } from '../../locale';

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

export const SetEditor = () => {
    const values = useSelector(store => store.editors.editorSetReducer.values);
    const currentValue = useSelector(store => store.editors.editorSetReducer.currentValue);
    const styles = useStyles();
    const currentKey = useSelector(store => store.viewerReducer.key);
    const viewValue = useSelector(store => store.editors.editorSetReducer.viewValue);
    const dispatch = useDispatch();
    const items = values.map((value) => ({
        value,
        key: value,
    }));

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsWrapper}>
                    <Button onClick={async () => {
                        await redisClient().sadd(currentKey, 'new_value');
                        dispatch(editorSetGetValues());

                        dispatch(editorSetSetValue(''));
                    }}>
                        {locale().common.add}
                    </Button>
                    <List
                        item={items.find((i) => i.value === currentValue.toString())}
                        items={items}
                        onChangeItem={(item) => dispatch(editorSetSetValue(item.value))}
                        contextMenu={[
                            {
                                value: locale().common.remove,
                                onClick: async (item) => {
                                    await redisClient().srem(currentKey, item.value);
                                    dispatch(editorSetGetValues());
                                }
                            }
                        ]}
                    />
                </div>
                <div className={styles.valueEditor}>
                    <div className={styles.buttons}>
                        <div className={styles.spacer}></div>
                        <Button className={styles.button} onClick={() => dispatch(editorSetUpdate())}>
                            {locale().common.save}
                        </Button>
                        <Button className={styles.button} onClick={() => dispatch(editorSetGetValues())}>
                            {locale().common.refresh}
                        </Button>
                    </div>
                    <EditorArea value={viewValue} onChange={(newValue) => dispatch(editorSetSetViewValue(newValue))} />
                </div>
            </Split>
        </Row>
    </div>;
}