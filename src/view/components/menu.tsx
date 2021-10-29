import React from 'react';
import { Tree } from './tree';
import { Input } from './input';

const style = require('./menu.css').default;

interface ITree {
    [key: string]: ITree;
};

interface IProps {
    tree: ITree;
    searchFieldOnChange: (val: string) => void;
    searchField: string;
}

export const Menu = ({ tree, searchFieldOnChange, searchField }: IProps) => {
    return <div className={style.menu}>
        <Input onChange={(e) => searchFieldOnChange(e.target.value)} value={searchField} />
        <div className={style.tree}>
            {Object.keys(tree).map(key => <>
                <Tree current={key} tree={tree}></Tree>        
            </>)}
        </div>
    </div>
}

