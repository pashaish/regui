import React, { useEffect } from 'react';
import { TreeNode } from './tree-node';
import { Input } from './elements/input';
import { ITreeNode } from '../../types/tree';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../reducers';
import { changeSearchFieldAction, getTreeAction } from '../actions/viewerAction';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../constants/colors';
import { Button } from './elements/button';
import { Link } from 'react-router-dom';
import { deleteActiveConnection, setActiveConnection } from '../../storage/connections';
import { redisClientDisconnect } from '../../common';

const useStyles = createUseStyles({
    menu: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'overlay',
        padding: paddings.main,
        backgroundColor: colors.first,
        height: `calc(100vh - calc(${paddings.main} + ${paddings.main}))`,
        boxShadow: `0 0 6px -1px ${colors.separator}`,
    },
    searchFieldWrapper: {
        paddingBottom: paddings.main,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15px',
        fontSize: '10px',
        margin: '4px',
        '& > *': {
            margin: paddings.second,
        }
    },
    spacer: {
        margin: 'auto',
    },
    button: {
        fontSize: '10px',
        height: '100%'
    },
    tree: {
        overflow: 'overlay',
        height: '100%',
    },
});

export const Menu = () => {
    type state = ReturnType<typeof store.getState>;
    const searchField = useSelector<state, string>((state) => state.viewerReducer.searchField);
    const tree = useSelector<state, ITreeNode>((state) => state.viewerReducer.tree);
    const styles = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTreeAction());
    }, [searchField]);

    return <div className={styles.menu}>
        <div className={styles.searchFieldWrapper}>
            <Input
                onChange={(e: any) => dispatch(changeSearchFieldAction(e.target.value))}
                value={searchField}
                placeholder='filter'
            />
            <Button
                className={styles.button}
                onClick={() => dispatch(getTreeAction())}
            >refresh</Button>
            <Button className={styles.button} onClick={() => location.hash = 'add-key'}>
                add
            </Button>
        </div>
        <div className={styles.tree}>
            {Object.keys(tree).map(key =>
                <TreeNode
                    path={[key]}
                    key={key}
                    current={key}
                    tree={tree}
                />
            )}
        </div>
        <div>
            <Button onClick={() => {
                redisClientDisconnect();
                location.hash = '/connections';
            }}>disconnect</Button>
        </div>
    </div>
}

