import { editorHashAction, EDITOR_HASH_SET_FIELDS, EDITOR_HASH_SET_VALUE } from "../actions/editor-hash";
import { editorListAction, EDITOR_LIST_SET_INDEX, EDITOR_LIST_SET_VALUES } from "../actions/editor-list";
import { viewerAction } from "../actions/viewerAction";

interface InitialState {
    searchField: string;
    currentIndex: number;
    values: string[];
    currentValue: string;
}

const initialState: InitialState = {
    searchField: '',
    currentIndex: -1,
    values: [],
    currentValue: '',
}

export const editorListReducer = (state = initialState, action: editorListAction): InitialState  => {
    switch(action.type) {
        case EDITOR_LIST_SET_VALUES: return {
            ...state,
            values: action.payload.values,
        }

        case EDITOR_LIST_SET_INDEX: return {
            ...state,
            currentIndex: action.payload.index,
            currentValue: state.values[action.payload.index]
        }
        default: return state;
    }
}
