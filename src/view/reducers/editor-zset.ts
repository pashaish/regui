
import {
    editorZSetAction,
    EDITOR_ZSET_CLEAR,
    EDITOR_ZSET_SET_CURRENT_VALUE,
    EDITOR_ZSET_SET_VALUES,
    EDITOR_ZSET_SET_VIEW_VALUE,
    EDITOR_ZSET_STATUS
} from "../actions/editor-zset";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";

interface InitialState {
    searchField: string;
    currentValue: [string, string];
    values: [string, string][];
    value: [string, string];
    viewValue: [string, string];
    status: loadingStatus;
}

const initialState: InitialState = {
    searchField: '',
    currentValue: ['0', ''],
    values: [],
    value: ['0', ''],
    status: LOADING_STATUS.NORMAL,
    viewValue: ['0', ''],
}

export const editorZSetReducer = (state = initialState, action: editorZSetAction): InitialState  => {
    switch(action.type) {
        case EDITOR_ZSET_SET_VALUES: return {
            ...state,
            values: action.payload.values.sort(([a], [b]) => Number(a) - Number(b)),
        }
        case EDITOR_ZSET_SET_CURRENT_VALUE: return {
            ...state,
            currentValue: [action.payload.mass || state.currentValue[0], action.payload.value],
            viewValue: [action.payload.mass || state.currentValue[0], action.payload.value],
        }
        case EDITOR_ZSET_CLEAR: return {
            ...initialState,
        }
        case EDITOR_ZSET_STATUS: return {
            ...state,
            status: action.paylaod.status,
        }
        case EDITOR_ZSET_SET_VIEW_VALUE: return {
            ...state,
            viewValue: [action.payload.mass || state.currentValue[0], action.payload.value],
        }
        default: return state;
    }
}
