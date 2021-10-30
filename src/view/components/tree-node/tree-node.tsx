import React from 'react';
import { Menu } from "../menu/menu";

const style = require('./tree-node.css').default;

interface ITree {
    [key: string]: ITree;
};

interface IProps {
    tree: ITree;
    isRoot?: boolean;
    current?: string;
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

export const TreeNode = ({ current, tree }: IProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

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
                        key={key}
                        current={key}
                        tree={tree[current] || {}}
                    />
                </div>
            )}
        </div>
    </div>
}