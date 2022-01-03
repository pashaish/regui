import { ITreeNode } from '../../types/tree';
import { createTreeByKeys, redisClient } from '../../common'
import { store } from '../reducers';
import { editorHashClear, editorHashGetFields } from './editor-hash';
import { editorListClear, editorListGetValues } from './editor-list';
import { editorStringGetValue } from './editor-string';
import { REDIS_TYPES } from '../constants/redis-types';
import { editorSetGetValues } from './editor-set';

export const VIEWER_CHANGE_SEARCH_FIELD = 'VIEWER_CHANGE_SEARCH_FIELD';
export const VIEWER_CHANGE_RESET = 'VIEWER_CHANGE_RESET';
export const VIEWER_GET_TREE_SUCCESS = 'VIEWER_GET_TREE_REQUEST';
export const VIEWER_GET_TREE_STARTED = 'VIEWER_GET_TREE_LOADING';
export const VIEWER_GET_TREE_FAIlURE = 'VIEWER_GET_TREE_PAYLOAD';
export const VIEWER_SET_VALUE = 'VIEWER_SET_VALUE';
export const ADD_KEY = 'ADD_KEY';

export const KEYS_LIMIT = 500;

export const viewerActionResetState = () => {
    return {
        type: VIEWER_CHANGE_RESET as typeof VIEWER_CHANGE_RESET,
        payload: {},
    }
}

export const changeSearchFieldAction = (value: string) => {
    return {
        type: VIEWER_CHANGE_SEARCH_FIELD as typeof VIEWER_CHANGE_SEARCH_FIELD,
        value,
    }
}

export const getTreeAction = () => {
    return (dispatch: Function, getState: Function) => {
        const state = getState() as ReturnType<typeof store.getState>;
        const key = `*${state.viewerReducer.searchField.trim()}*` || '*';
        dispatch(getTreeActionStarted());
        const stream = redisClient().scanStream({
            count: 100,
            match: key,
        });
        const findedKeys: string[] = [];
        stream.on('data', (chunk) => {
            findedKeys.push(...chunk);
            dispatch(getTreeActionSuccess(createTreeByKeys(findedKeys) as ITreeNode));
            if (findedKeys.length >= KEYS_LIMIT) {
                stream.destroy();
            }
        });
    }
};

export const addKey = (key: string, typeValue: string) => {
    return async (dispatch: Function, getState: Function) => {
        const state = getState() as ReturnType<typeof store.getState>;

        switch(typeValue) {
            case REDIS_TYPES.STRING: {
                await redisClient().set(key, '');
                break;
            }
            case REDIS_TYPES.LIST: {
                await redisClient().lpush(key, 'new_value');
                break;
            }
            case REDIS_TYPES.HASH: {
                await redisClient().hset(key, 'field', 'value');
                break;
            }
            case REDIS_TYPES.SET: {
                await redisClient().sadd(key, 'new_value');
                break;
            }
            default: {
                throw new Error('failed type define');
            }
        }

        location.hash = '/';
        dispatch(getValueAction(key, typeValue))
        dispatch(setKey(key, typeValue));
    }
}

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

export const setKey = (key: string, type: string) => {
    return {
        type: VIEWER_SET_VALUE as typeof VIEWER_SET_VALUE,
        valueType: type,
        currentKey: key,
    }
}

const clearValues = (dispatch: Function, key: string, type: string) => {
    dispatch(setKey(key, type));
    dispatch(editorHashClear());
    dispatch(editorListClear());
}

export function getValueAction(key: string, type: string): Function {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        switch (type) {
            case 'string':
                clearValues(dispatch, key, type);
                dispatch(editorStringGetValue());
                break;
            case 'list':
                clearValues(dispatch, key, type);
                dispatch(editorListGetValues());
                break;
            case 'hash':
                clearValues(dispatch, key, type);
                dispatch(editorHashGetFields(key, state.editors.editorHashReducer.searchField));
                break;
            case 'none':
                clearValues(dispatch, key, type);
                break;
            case 'set':
                clearValues(dispatch, key, type);
                dispatch(editorSetGetValues());
                break;
        }
    }
}

export type viewerAction = 
    | ReturnType<typeof changeSearchFieldAction>
    | ReturnType<typeof getTreeActionSuccess>
    | ReturnType<typeof getTreeActionStarted>
    | ReturnType<typeof getTreeActionFailure>
    | ReturnType<typeof setKey>
    | ReturnType<typeof viewerActionResetState>
    // | ReturnType<typeof addKey>;