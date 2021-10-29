import React from 'react';
import { Menu } from "./menu";

const style = require('./tree.css').default;

interface ITree {
    [key: string]: ITree;
};

interface IProps {
    tree: ITree;
    isRoot?: boolean;
    current?: string;
}

const onClick = (isOpen, setIsOpen) => () => {
    setIsOpen(!isOpen);
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

export const Tree = ({ current, tree }: IProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const type = defineNodeType(tree, current, isOpen);

    return <div className={style.tree}>
        <div onClick={onClick(isOpen, setIsOpen)}>
            {icons[type]} {current}
        </div>
        <div className={isOpen ? '' : style.hidden}>
            {Object.keys(tree[current]).map((key, index) => 
                <div key={key}>
                    <Tree
                        current={key}
                        tree={tree[current] || {}}
                    />
                </div>
            )}
        </div>
    </div>
}