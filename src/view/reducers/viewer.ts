import { ITreeNode } from "../../types/tree"
import { viewerAction, VIEWER_CHANGE_SEARCH_FIELD, VIEWER_GET_TREE_STARTED, VIEWER_GET_TREE_FAIlURE, VIEWER_GET_TREE_SUCCESS, VIEWER_SET_VALUE } from "../actions/viewerAction";

export enum STATUS_LOADING_TREE {
    REQUEST,
    LOADING,
    PAYLOAD,
}

interface InitialState {
    searchField: string;
    currentKey: string;
    valueType: string;
    statusLoadingTree: STATUS_LOADING_TREE;
    tree: ITreeNode;
    value: string;
}

const initialState: InitialState = {
    searchField: '',
    currentKey: '',
    valueType: '',
    value: '',
    statusLoadingTree: STATUS_LOADING_TREE.REQUEST,
    tree: {},
}

export const viewerReducer = (state = initialState, action: viewerAction): InitialState  => {
    switch(action.type) {
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
            valueType: action.valueType,
            value: action.value,
            currentKey: action.currentKey,
        }
        default: return state;
    }
}
