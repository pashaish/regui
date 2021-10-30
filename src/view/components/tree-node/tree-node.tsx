import React, { useEffect } from 'react';
import { redisAPI } from '../../common';
import { Menu } from "../menu/menu";
import { FaList, FaCrow, FaFont } from 'react-icons/fa';

const style = require('./tree-node.css').default;

interface ITree {
    [key: string]: ITree;
};

interface IProps {
    tree: ITree;
    isRoot?: boolean;
    current?: string;
    path: string[];
}

const openCloseIcons = {
    open: "-",
    close: "+",
    final: " ",
}

const typeIcons = {
    'set': <FaList />,
    'string': <FaFont />,
    'none': '',
}

const defineNodeType = (
    tree: Object,
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

    useEffect(() => {
        redisAPI.defineType(path.join(':')).then((type) => {
            setRecordType(type);
        }).catch((err) => {
            setRecordType('none')
        });
    }, [recordType]);

    const type = defineNodeType(tree, current, isOpen);

    return <div className={style.tree}>
        <div className={style.row}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {openCloseIcons[type]}
            </div>
            <div onClick={() => {}}>
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