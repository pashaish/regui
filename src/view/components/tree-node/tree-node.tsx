import React, { useEffect } from 'react';
import { redisAPI } from '../../common';
import { Menu } from "../menu/menu";

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

const icons = {
    open: "-",
    close: "+",
    final: " ",
}

const defineNodeType = (
    tree: Object,
    current: string,
    isOpen: boolean,
): keyof typeof icons => {
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
    const [recordType, setRecordType] = React.useState('empty');

    useEffect(() => {
        redisAPI.defineType(path.join(':')).then((type) => {
            setRecordType(type);
            console.log(type, path.join(':'));
        }).catch((err) => {
            setRecordType('none')
        });
    }, [recordType]);

    const type = defineNodeType(tree, current, isOpen);

    return <div className={style.tree}>
        <div className={style.row}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {icons[type]}
            </div>
            <div onClick={() => {}}>
                {current}
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