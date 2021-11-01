import { editorHashAction, EDITOR_HASH_SET_FIELDS } from "../actions/editor-hash";
import { viewerAction } from "../actions/viewerAction";

interface InitialState {
    searchField: string;
    currentField: string;
    value: string;
    fields: string[];
}

const initialState: InitialState = {
    searchField: '',
    currentField: '',
    fields: [],
    value: '',
}

export const editorHashReducer = (state = initialState, action: editorHashAction): InitialState  => {
    switch(action.type) {
        case EDITOR_HASH_SET_FIELDS: return {
            ...state,
            fields: action.payload.fields,
        }
        default: return state;
    }
}
