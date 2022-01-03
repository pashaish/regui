import React, { useEffect, useState } from 'react';
import { redisClient } from '../../common';
import { FaList, FaCaretDown, FaCaretRight, FaRegCircle, FaBorderAll, FaFolder, FaGripLines, FaStripe, FaEllipsisH, FaCircle, FaHockeyPuck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getTreeAction, getValueAction, setKey } from '../actions/viewerAction';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { store } from '../reducers';
import { ContextMenu } from './elements/context-menu';
import { Input } from './elements/input';

const useStyles = createUseStyles({
    icon: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontSize: `8px`,
        padding: `4px`,
        opacity: '0.5',
    },
    keyPart: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
    },
    tree: {
        paddingLeft: '2px',
        marginLeft: '5px',
        userSelect: 'none',
        cursor: 'pointer',
        borderLeft: `1px solid ${colors.secondFont + '50'}`,
    },
    selected: {
        backgroundColor: colors.second,
    },
    closeStatusIcon: {
        display: 'flex',
        opacity: '0.5',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px',
        // marginRight: '2px',
        // marginLeft: '2px',
        minWidth: '12px',
    },
    rootNode: {
        borderLeft: `1px solid transparent`,
        marginLeft: 0,
        paddingLeft: 0,
    },
    row: {
        alignItems: 'center',
        height: `18px`,
        display: 'flex',
        flexDirection: 'row',
        '&:hover': {
            backgroundColor: colors.second,
        },
    },
    hidden: {
        display: 'none',
    }
});

interface ITree {
    [key: string]: ITree;
};

interface IProps {
    tree: ITree;
    isRoot?: boolean;
    current: string;
    path: string[];
}

const openCloseIcons = {
    open: <FaCaretDown />,
    close: <FaCaretRight />,
    final: <FaRegCircle style={{ fontSize: '6px' }} />,
}

const typeIcons: Record<string, string | JSX.Element> = {
    'list': <FaList />,
    'string': <FaGripLines />,
    'hash': <FaBorderAll />,
    'set': <FaEllipsisH />,
    'zset': <FaHockeyPuck />,
    'none': <FaFolder />,
}

const defineNodeType = (
    tree: ITree,
    current: string,
    isOpen: boolean,
): keyof typeof openCloseIcons => {
    if (Object.keys(tree[current]).length === 0) {
        return "final";
    }

    if (isOpen) {
        return "open";
    }

    return "close";
}

export const TreeNode = ({ current, tree, path }: IProps) => {
    type state = ReturnType<typeof store.getState>;
    const [isOpen, setIsOpen] = React.useState(false);
    const [recordType, setRecordType] = React.useState('none');
    const style = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        redisClient().type(path.join(':')).then((type: any) => {
            setRecordType(type);
        }).catch((err: any) => {
            setRecordType('none')
        });
    }, [recordType]);

    const type = defineNodeType(tree, current, isOpen);
    const currentKey = useSelector<state, string>(state => state.viewerReducer.key);
    const fullCurrent = path.join(':');
    const [isEditKey, setIsEditKey] = useState(false);
    const [editValue, setEditValue] = useState('');

    return <><ContextMenuTrigger id={`tree-node-${fullCurrent}`}>
        <div className={`${style.tree} ${path.length < 2 ? style.rootNode : ''}`}>
            <div className={`${style.row} ${currentKey === fullCurrent ? style.selected : ''}`} data-type={recordType} onClick={() => {
                if (recordType !== 'none') {
                    dispatch(getValueAction(path.join(':'), recordType))
                } else {
                    setIsOpen(!isOpen);
                }
            }}>
                <div className={`${style.closeStatusIcon}`} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}>
                    {openCloseIcons[type]}
                </div>
                <div className={style.icon}>
                    {typeIcons[recordType]}
                </div>
                {
                    isEditKey ?
                    <Input
                        defaultValue={current}
                        onBlur={() => setIsEditKey(false)}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={async (e) => {
                            if (e.key !== 'Enter') {
                                return;
                            }

                            if ((await redisClient().keys(editValue)).length > 0) {
                                return;
                            }

                            setIsEditKey(false);

                            await redisClient().rename(current, editValue);
                            dispatch(getTreeAction());
                        }}
                    ></Input>
                    :
                    <div className={style.keyPart}>
                        {current}
                    </div>
                }
            </div>
            <div className={isOpen ? '' : style.hidden}>
                {Object.keys(tree[current]).map((key, index) =>
                    <div key={key}>
                        <TreeNode
                            path={[...path, key]}
                            key={[...path, key].join(':')}
                            current={key}
                            tree={tree[current] || {}}
                        />
                    </div>
                )}
            </div>
        </div>
    </ContextMenuTrigger>
        <ContextMenu id={`tree-node-${fullCurrent}`}>
            {
                recordType !== 'none' ?
                <>
                <MenuItem onClick={() => {
                    setIsEditKey(true);
                }}>rename {current}</MenuItem>
                <MenuItem onClick={() => {
                    redisClient().del(`${fullCurrent}`);
                    dispatch(getTreeAction());
                }}>remove {current}</MenuItem>
                </>
                : <></>
            }
        </ContextMenu>
    </>
}