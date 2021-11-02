import { editorSetAction, EDITOR_SET_CLEAR, EDITOR_SET_SET_VALUE, EDITOR_SET_STATUS } from "../actions/editor-set";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";

interface InitialState {
    value: string;
    status: loadingStatus;
}

const initialState: InitialState = {
    value: '',
    status: LOADING_STATUS.NORMAL,
}

export const editorSetReducer = (state = initialState, action: editorSetAction): InitialState  => {
    switch(action.type) {
        case EDITOR_SET_SET_VALUE: return {
            ...state,
            value: action.payload.value,
        }
        case EDITOR_SET_CLEAR: return {
            ...initialState,
        }
        case EDITOR_SET_STATUS: return {
            ...state,
            status: action.payload.status,
        }
        default: return state;
    }
}
