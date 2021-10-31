import React, { useEffect } from 'react';
import { redisClient } from '../../common';
import { Menu } from "./menu";
import { FaList, FaCrow, FaFont, FaListAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getValueAction, setValue } from '../actions/viewerAction';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    tree: {
        paddingLeft: '4px',
        marginLeft: '4px',
        borderLeft: '1px solid black',
        userSelect: 'none',
        cursor: 'pointer',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
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

    return <div className={style.tree}>
        <div className={style.row} data-type={recordType}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {openCloseIcons[type]}
            </div>
            <div onClick={() => {
                dispatch(getValueAction(path.join(':'), recordType))
            }}>
                {current} {typeIcons[recordType]}
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