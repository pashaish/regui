import React, { useState } from 'react';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';
import { locale } from '../locale';
import { ContextMenu } from './elements/context-menu';
import { Input } from './elements/input';

interface Item {
    value: string;
    viewValue?: string;
    key: string;
}

interface Props<T> {
    item?: T;
    items?: T[];
    contextMenu?: {
        value: string;
        onClick: (item: T) => void;
    }[];
    onEditValue?: (value: string) => void;
    onKeyDownEditableInput?: (e: React.KeyboardEvent<HTMLInputElement>, item: T) => {}
    onChangeItem?: (item: T) => void;
}


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

export function List<T extends Item>(props: Props<T>) {
    const styles = useStyles();
    const [editableFieldIndex, setEditableFieldIndex] = useState(-1);

    return <div className={styles.fieldsMenu}>
        {(props.items || []).map((item, index) => {
            return <div key={item.value + item.key + index}>
                <ContextMenuTrigger id={`hash-editor-field-${item.value + item.key + index}`}>
                    {editableFieldIndex === index ?
                        <Input
                            defaultValue={item.value}
                            autoFocus={true}
                            onBlur={() => setEditableFieldIndex?.(-1)}
                            onChange={(e) => props.onEditValue?.(e.target.value)}
                            onKeyDown={
                                async (e) => {
                                    if (e.key !== "Enter") {
                                        return;
                                    }

                                    setEditableFieldIndex(-1);

                                    props.onKeyDownEditableInput?.(e, item);
                                }
                            }></Input>
                        :
                        <div
                            className={`${styles.field} ${props.item === item ? styles.selected : ''}`}
                            onClick={() => {
                                props.onChangeItem?.(item)
                            }}
                            key={item.key}
                        >
                            {item.viewValue || item.value}
                        </div>
                    }
                </ContextMenuTrigger>
                <ContextMenu id={`hash-editor-field-${item.value + item.key + index}`}>
                    {(props.contextMenu || []).map((ctx) => {
                        return <MenuItem key={ctx.value} onClick={() => ctx.onClick(item)}>
                            {ctx.value}
                        </MenuItem>
                    })}
                    {props.onEditValue ?
                        <MenuItem onClick={() => {
                            setEditableFieldIndex(index);
                        }}>
                            {locale().common.rename}
                        </MenuItem>
                    :
                        <></>
                    }
                </ContextMenu>
            </div>
        })}
    </div>
};
