import _ from "lodash";
import { redisClient } from "../../common";
import { store } from "../reducers";

export const EDITOR_SET_SET_VALUE = "EDITOR_SET_SET_VALUE";
export const EDITOR_SET_CLEAR = "EDITOR_SET_CLEAR";

export const editorSetSetValue = (value: string) => {
    return {
        type: EDITOR_SET_SET_VALUE as typeof EDITOR_SET_SET_VALUE,
        payload: {
            value,
        },
    }
}

export const editorSetGetValue = () => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        redisClient.get(state.viewerReducer.key).then(value => {
            dispatch(editorSetSetValue(value || ''));
        });
    }
}

export const editorSetClear = () => {
    return {
        type: EDITOR_SET_CLEAR as typeof EDITOR_SET_CLEAR,
    }
}

export type editorSetAction = 
    | ReturnType<typeof editorSetSetValue>
    | ReturnType<typeof editorSetClear>
