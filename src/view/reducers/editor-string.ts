import { editorStringAction, EDITOR_STRING_CLEAR, EDITOR_STRING_SET_VALUE, EDITOR_STRING_STATUS, EDITOR_STRING_VIEW_VALUE } from "../actions/editor-string";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";

interface InitialState {
    value: string;
    viewValue: string,
    status: loadingStatus;
}

const initialState: InitialState = {
    value: '',
    viewValue: '',
    status: LOADING_STATUS.NORMAL,
}

export const editorStringReducer = (state = initialState, action: editorStringAction): InitialState  => {
    switch(action.type) {
        case EDITOR_STRING_SET_VALUE: return {
            ...state,
            value: action.payload.value,
            viewValue: action.payload.value,
        }
        case EDITOR_STRING_CLEAR: return {
            ...initialState,
        }
        case EDITOR_STRING_STATUS: return {
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
