import _ from "lodash";
import { redisClient } from "../../common";
import { store } from "../reducers";

export const EDITOR_LIST_SET_VALUES = "EDITOR_LIST_SET_VALUES";
export const EDITOR_LIST_SET_INDEX = "EDITOR_LIST_SET_INDEX";
export const EDITOR_LIST_CLEAR = "EDITOR_LIST_CLEAR";

export const editorListSetValues = (values: string[]) => {
    return {
        type: EDITOR_LIST_SET_VALUES as typeof EDITOR_LIST_SET_VALUES,
        payload: {
            values,
        },
    }
}

export const editorListGetValues = () => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        redisClient.smembers(state.viewerReducer.currentKey).then(values => {
            dispatch(editorListSetValues(values));
        });
    }
}

export const editorListSetIndex = (index: number) => {
    return {
        type: EDITOR_LIST_SET_INDEX as typeof EDITOR_LIST_SET_INDEX,
        payload: {
            index,
        }
    }
}

export const editorListClear = () => {
    return {
        type: EDITOR_LIST_CLEAR as typeof EDITOR_LIST_CLEAR,
    }
}

export type editorListAction = 
    | ReturnType<typeof editorListSetValues>
    | ReturnType<typeof editorListSetIndex>
    | ReturnType<typeof editorListClear>
