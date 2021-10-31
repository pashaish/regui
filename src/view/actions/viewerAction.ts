import { ITreeNode } from '../../types/tree';
import { createTreeByKeys, redisClient } from '../../common'
import { store } from '../reducers';

export const VIEWER_CHANGE_SEARCH_FIELD = 'VIEWER_CHANGE_SEARCH_FIELD';
export const VIEWER_GET_TREE_SUCCESS = 'VIEWER_GET_TREE_REQUEST';
export const VIEWER_GET_TREE_STARTED = 'VIEWER_GET_TREE_LOADING';
export const VIEWER_GET_TREE_FAIlURE = 'VIEWER_GET_TREE_PAYLOAD';
export const VIEWER_SET_VALUE = 'VIEWER_SET_VALUE';

export const changeSearchFieldAction = (value: string) => {
    return {
        type: VIEWER_CHANGE_SEARCH_FIELD as typeof VIEWER_CHANGE_SEARCH_FIELD,
        value,
    }
}

export const getTreeAction = () => {
    return (dispatch: Function, getState: Function) => {
        const state = getState() as ReturnType<typeof store.getState>;
        dispatch(getTreeActionStarted());
        redisClient.keys(`*${state.viewerReducer.searchField.trim()}*` || '*').then((tree: any) => {
            dispatch(getTreeActionSuccess(createTreeByKeys(tree) as ITreeNode))
        }).catch((err: any) => {
            dispatch(getTreeActionFailure())
        });
    }
};

export const getTreeActionSuccess = (tree: ITreeNode) => {
    return {
        type: VIEWER_GET_TREE_SUCCESS as typeof VIEWER_GET_TREE_SUCCESS,
        tree,
    }
};

export const getTreeActionStarted = () => {
    return {
        type: VIEWER_GET_TREE_STARTED as typeof VIEWER_GET_TREE_STARTED,
    }
}

export const getTreeActionFailure = () => {
    return {
        type: VIEWER_GET_TREE_FAIlURE as typeof VIEWER_GET_TREE_FAIlURE,
    }
}

export const setValue = (value: string, key: string, type: string) => {
    return {
        type: VIEWER_SET_VALUE as typeof VIEWER_SET_VALUE,
        valueType: type,
        currentKey: key,
        value
    }
}

export function getValueAction(key: string, type: 'set'): Function
export function getValueAction(key: string, type: 'string'): Function
export function getValueAction(key: string, type: string): Function
export function getValueAction(key: string, type: any): Function {
    return (dispatch: Function) => {
        switch (type) {
            case 'string': 
                redisClient.get(key).then((value: any) => {
                    if(value) {
                        dispatch(setValue(value, key, type));
                    }
                });
                break;
            case 'set':
                redisClient.smembers(key).then((value: any) => {
                    if(value) {
                        dispatch(setValue(JSON.stringify(value), key, type));
                    }
                });
                break;
            case 'hash':
                redisClient.hgetall(key).then((value: any) => {
                    if (value) {
                        dispatch(setValue(JSON.stringify(value), key, type));
                    }
                });
                break;
            case 'none': 
                break;
        }
    }
}

export type viewerAction = 
    | ReturnType<typeof changeSearchFieldAction>
    | ReturnType<typeof getTreeActionSuccess>
    | ReturnType<typeof getTreeActionStarted>
    | ReturnType<typeof setValue>
    | ReturnType<typeof getTreeActionFailure>;