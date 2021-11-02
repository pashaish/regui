import { editorHashAction, EDITOR_HASH_SET_FIELDS, EDITOR_HASH_SET_VALUE } from "../actions/editor-hash";
import { editorListAction, EDITOR_LIST_CLEAR, EDITOR_LIST_SET_INDEX, EDITOR_LIST_SET_VALUES, EDITOR_LIST_SET_VIEW_VALUE, EDITOR_LIST_STATUS } from "../actions/editor-list";
import { viewerAction } from "../actions/viewerAction";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";

interface InitialState {
    searchField: string;
    currentIndex: number;
    values: string[];
    value: string;
    viewValue: string;
    status: loadingStatus;
}

const initialState: InitialState = {
    searchField: '',
    currentIndex: -1,
    values: [],
    value: '',
    status: LOADING_STATUS.NORMAL,
    viewValue: '',
}

export const editorListReducer = (state = initialState, action: editorListAction): InitialState  => {
    switch(action.type) {
        case EDITOR_LIST_SET_VALUES: return {
            ...state,
            values: action.payload.values,
        }
        case EDITOR_LIST_SET_INDEX: return { // TODO: это не массив, это set уникальных значений
                                             // нужно избавляться от индекса
            ...state,
            currentIndex: action.payload.index,
            value: state.values[action.payload.index],
            viewValue: state.values[action.payload.index],
        }
        case EDITOR_LIST_CLEAR: return {
            ...initialState,
        }
        case EDITOR_LIST_STATUS: return {
            ...state,
            status: action.paylaod.status,
        }
        case EDITOR_LIST_SET_VIEW_VALUE: return {
            ...state,
            viewValue: action.payload.value,
        }
        default: return state;
    }
}
