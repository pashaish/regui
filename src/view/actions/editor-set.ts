import _ from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";

export const EDITOR_SET_SET_VALUE = "EDITOR_SET_SET_VALUE";
export const EDITOR_SET_CLEAR = "EDITOR_SET_CLEAR";
export const EDITOR_SET_STATUS = "EDITOR_SET_STATUS";

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
export const editorSetStatus = (status: loadingStatus) => {
    return {
        type: EDITOR_SET_STATUS as typeof EDITOR_SET_STATUS,
        payload: {
            status,
        }
    }
}

export const editorSetUpdate = (value: string) => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        const key = state.viewerReducer.key;

        dispatch(editorSetStatus(LOADING_STATUS.LOADING));
        redisClient.set(key, value).then((status) => {
            dispatch(editorSetStatus(status === "OK" ? LOADING_STATUS.LOADED : LOADING_STATUS.ERROR));
        }).catch((e) => {
            dispatch(editorSetStatus(LOADING_STATUS.ERROR));
        });
    }
}

export type editorSetAction = 
    | ReturnType<typeof editorSetSetValue>
    | ReturnType<typeof editorSetClear>
    | ReturnType<typeof editorSetStatus>