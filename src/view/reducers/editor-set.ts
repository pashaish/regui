import { editorSetAction, EDITOR_SET_CLEAR, EDITOR_SET_SET_VALUE, EDITOR_SET_STATUS, EDITOR_SET_VIEW_VALUE } from "../actions/editor-set";
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

export const editorSetReducer = (state = initialState, action: editorSetAction): InitialState  => {
    switch(action.type) {
        case EDITOR_SET_SET_VALUE: return {
            ...state,
            value: action.payload.value,
            viewValue: action.payload.value,
        }
        case EDITOR_SET_CLEAR: return {
            ...initialState,
        }
        case EDITOR_SET_STATUS: return {
            ...state,
            status: action.payload.status,
        }
        case EDITOR_SET_VIEW_VALUE: return {
            ...state,
            viewValue: action.payload.value,
        }
        default: return state;
    }
}
