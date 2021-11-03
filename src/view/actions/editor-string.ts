import _ from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";

export const EDITOR_STRING_SET_VALUE = "EDITOR_STRING_SET_VALUE";
export const EDITOR_STRING_VIEW_VALUE = "EDITOR_STRING_VIEW_VALUE";
export const EDITOR_STRING_CLEAR = "EDITOR_STRING_CLEAR";
export const EDITOR_STRING_STATUS = "EDITOR_STRING_STATUS";

export const editorStringSetValue = (value: string) => {
    return {
        type: EDITOR_STRING_SET_VALUE as typeof EDITOR_STRING_SET_VALUE,
        payload: {
            value,
        },
    }
}

export const editorStringGetValue = () => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        redisClient.get(state.viewerReducer.key).then(value => {
            dispatch(editorStringSetValue(value || ''));
        });
    }
}

export const editorStringClear = () => {
    return {
        type: EDITOR_STRING_CLEAR as typeof EDITOR_STRING_CLEAR,
    }
}
export const editorStringStatus = (status: loadingStatus) => {
    return {
        type: EDITOR_STRING_STATUS as typeof EDITOR_STRING_STATUS,
        payload: {
            status,
        }
    }
}

export const editorStringUpdate = (value: string) => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        const key = state.viewerReducer.key;

        dispatch(editorStringStatus(LOADING_STATUS.LOADING));
        redisClient.set(key, value).then((status) => {
            dispatch(editorStringStatus(status === "OK" ? LOADING_STATUS.LOADED : LOADING_STATUS.ERROR));
        }).catch((e) => {
            dispatch(editorStringStatus(LOADING_STATUS.ERROR));
        });
    }
}

export const editorStringSetViewValue = (value: string) => {
    return {
        type: EDITOR_STRING_VIEW_VALUE as typeof EDITOR_STRING_VIEW_VALUE,
        payload: {
            value,
        },
    }
}

export type editorStringAction = 
    | ReturnType<typeof editorStringSetValue>
    | ReturnType<typeof editorStringClear>
    | ReturnType<typeof editorStringStatus>
    | ReturnType<typeof editorStringSetViewValue>