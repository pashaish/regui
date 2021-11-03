import { editorHashAction, EDITOR_HASH_SET_FIELDS, EDITOR_HASH_SET_VALUE, EDITOR_HASH_STATUS } from "../actions/editor-hash";
import { EDITOR_LIST_CLEAR } from "../actions/editor-list";
import { EDITOR_STRING_VIEW_VALUE } from "../actions/editor-string";
import { viewerAction } from "../actions/viewerAction";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";

interface InitialState {
    searchField: string;
    currentField: string;
    value: string;
    viewValue: string;
    fields: string[];
    status: loadingStatus;
}

const initialState: InitialState = {
    status: LOADING_STATUS.NORMAL,
    searchField: '',
    currentField: '',
    fields: [],
    value: '',
    viewValue: '',
}

export const editorHashReducer = (state = initialState, action: editorHashAction): InitialState  => {
    switch(action.type) {
        case EDITOR_HASH_SET_FIELDS: return {
            ...state,
            fields: action.payload.fields,
        }
        case EDITOR_HASH_SET_VALUE: return {
            ...state,
            currentField: action.payloads.field,
            value: action.payloads.value,
            viewValue: action.payloads.value,
        }
        case EDITOR_LIST_CLEAR: return {
            ...initialState,
        }
        case EDITOR_HASH_STATUS: return {
            ...state,
            status: action.payload.status,
        }
        case EDITOR_STRING_VIEW_VALUE: return {
            ...state,
            viewValue: action.payload.value,
        }
        default: return state;
    }
}
