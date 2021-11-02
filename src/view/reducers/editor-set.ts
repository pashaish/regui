import { editorSetAction, EDITOR_SET_CLEAR, EDITOR_SET_SET_VALUE } from "../actions/editor-set";

interface InitialState {
    value: string;
}

const initialState: InitialState = {
    value: '',
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
        default: return state;
    }
}
