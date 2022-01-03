
import { editorSetAction, EDITOR_SET_CLEAR, EDITOR_SET_SET_CURRENT_VALUE, EDITOR_SET_SET_VALUES, EDITOR_SET_SET_VIEW_VALUE, EDITOR_SET_STATUS } from "../actions/editor-set";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { editorListAction, EDITOR_LIST_CLEAR, EDITOR_LIST_SET_INDEX, EDITOR_LIST_SET_VALUES, EDITOR_LIST_SET_VIEW_VALUE, EDITOR_LIST_STATUS } from "../actions/editor-list";

interface InitialState {
    searchField: string;
    currentValue: string;
    values: string[];
    value: string;
    viewValue: string;
    status: loadingStatus;
}

const initialState: InitialState = {
    searchField: '',
    currentValue: '',
    values: [],
    value: '',
    status: LOADING_STATUS.NORMAL,
    viewValue: '',
}

export const editorSetReducer = (state = initialState, action: editorSetAction): InitialState  => {
    switch(action.type) {
        case EDITOR_SET_SET_VALUES: return {
            ...state,
            values: action.payload.values.sort(),
        }
        case EDITOR_SET_SET_CURRENT_VALUE: return {
            ...state,
            currentValue: action.payload.value,
            viewValue: action.payload.value,
        }
        case EDITOR_SET_CLEAR: return {
            ...initialState,
        }
        case EDITOR_SET_STATUS: return {
            ...state,
            status: action.paylaod.status,
        }
        case EDITOR_SET_SET_VIEW_VALUE: return {
            ...state,
            viewValue: action.payload.value,
        }
        default: return state;
    }
}
