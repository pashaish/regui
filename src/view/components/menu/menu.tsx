import React, { useEffect } from 'react';
import { TreeNode } from '../tree-node/tree-node';
import { Input } from '../input/input';
import { ITreeNode } from '../../../types/tree';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../reducers';
import { changeSearchFieldAction, getTreeAction } from '../../actions/viewerAction';

const style = require('./menu.css').default;

export const Menu = () => {
    type state = ReturnType<typeof store.getState>;
    const searchField = useSelector<state, string>((state) => state.viewerReducer.searchField);
    const tree = useSelector<state, ITreeNode>((state) => state.viewerReducer.tree);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTreeAction());
    }, [searchField]);

    return <div className={style.menu}>
        <Input onChange={(e) => dispatch(changeSearchFieldAction(e.target.value))} value={searchField} />
        <div className={style.tree}>
            {Object.keys(tree).map(key =>
                <TreeNode
                    key={key}
                    current={key}
                    tree={tree}
                />
            )}
        </div>
    </div>
}

