import React, { useEffect } from 'react';
import { redisClient } from '../../common';
import { Menu } from "./menu";
import { FaList, FaCrow, FaFont, FaListAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getValueAction, setValue } from '../actions/viewerAction';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';

const useStyles = createUseStyles({
    icon: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontSize: `8px`,
        padding: `4px`,
    },
    keyPart: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    tree: {
        paddingLeft: '2px',
        marginLeft: '6px',
        userSelect: 'none',
        cursor: 'pointer',
        borderLeft: `1px solid ${colors.secondFont}`,
    },
    closeStatusIcon: {
        marginRight: '2px',
        marginLeft: '2px',
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
    open: "-",
    close: "+",
    final: " ",
}

const typeIcons: Record<string, string | JSX.Element> = {
    'set': <FaList />,
    'string': <FaFont />,
    'hash': <FaListAlt />,
    'none': '',
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
    const [isOpen, setIsOpen] = React.useState(false);
    const [recordType, setRecordType] = React.useState('none');
    const style = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        redisClient.type(path.join(':')).then((type: any) => {
            setRecordType(type);
        }).catch((err: any) => {
            setRecordType('none')
        });
    }, [recordType]);

    const type = defineNodeType(tree, current, isOpen);

    return <div className={`${style.tree} ${ path.length < 2 ? style.rootNode : ''}`}>
        <div className={style.row} data-type={recordType}>
            <div className={style.closeStatusIcon} onClick={() => {
                setIsOpen(!isOpen)
            }}>
                {openCloseIcons[type]}
            </div>
            <div className={style.keyPart} onClick={() => {
                if (recordType !== 'none') {
                    dispatch(getValueAction(path.join(':'), recordType))
                } else {
                    setIsOpen(!isOpen);
                }
            }}>
                {current}
            </div>
            <div className={style.icon}>
                {typeIcons[recordType]}
            </div>
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
}