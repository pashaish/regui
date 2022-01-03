import { ITreeNode } from "../../types/tree"
import { viewerAction, VIEWER_CHANGE_SEARCH_FIELD, VIEWER_GET_TREE_STARTED, VIEWER_GET_TREE_FAIlURE, VIEWER_GET_TREE_SUCCESS, VIEWER_SET_VALUE, ADD_KEY, VIEWER_CHANGE_RESET, VIEWER_SET_TTL } from "../actions/viewerAction";

export enum STATUS_LOADING_TREE {
    REQUEST,
    LOADING,
    PAYLOAD,
}

interface InitialState {
    searchField: string;
    key: string;
    type: string;
    tree: ITreeNode;
    ttl: string;
}

const initialState: InitialState = {
    searchField: '',
    key: '',
    type: '',
    ttl: '',
    tree: {},
}

export const viewerReducer = (state = initialState, action: viewerAction): InitialState  => {
    switch(action.type) {
        case VIEWER_SET_TTL: return {
            ...state,
            ttl: action.payload.ttl,
        }
        case VIEWER_CHANGE_RESET: return {
            ...initialState,
        }
        case VIEWER_CHANGE_SEARCH_FIELD: return {
            ...state,
            searchField: action.value,
        }
        case VIEWER_GET_TREE_SUCCESS: return {
            ...state,
            tree: action.tree,
        }
        case VIEWER_GET_TREE_STARTED: return {
            ...state,
        }
        case VIEWER_GET_TREE_FAIlURE: return {
            ...state,
        }
        case VIEWER_SET_VALUE: return {
            ...state,
            type: action.valueType,
            key: action.currentKey,
        }
        default: return state;
    }
}
