import _ from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";
import { editorSetStatus } from "./editor-set";

export const EDITOR_LIST_SET_VALUES = "EDITOR_LIST_SET_VALUES";
export const EDITOR_LIST_SET_INDEX = "EDITOR_LIST_SET_INDEX";
export const EDITOR_LIST_CLEAR = "EDITOR_LIST_CLEAR";
export const EDITOR_LIST_SET_VIEW_VALUE = "EDITOR_LIST_SET_VIEW_VALUE";
export const EDITOR_LIST_STATUS = "EDITOR_LIST_STATUS";

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
        redisClient.smembers(state.viewerReducer.key).then(values => {
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

export const editorListSetViewValue = (value: string) => {
    return {
        type: EDITOR_LIST_SET_VIEW_VALUE as typeof EDITOR_LIST_SET_VIEW_VALUE,
        payload: {
            value,
        },
    }
}

export const editorListStatus = (status: loadingStatus) => {
    return {
        type: EDITOR_LIST_STATUS as typeof EDITOR_LIST_STATUS,
        paylaod: {
            status,
        }
    }
}

export const editorListUpdate = () => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        dispatch(editorListStatus(LOADING_STATUS.LOADING));

        redisClient.sadd(
            state.viewerReducer.key,
            state.editors.editorListReducer.viewValue,
        ).then(() => {
            redisClient.srem(
                state.viewerReducer.key,
                state.editors.editorListReducer.value
            ).then(() => {
                dispatch(editorListStatus(LOADING_STATUS.LOADED));
            }).catch(() => {
                dispatch(editorListStatus(LOADING_STATUS.ERROR));
            });
        }).catch((err) => {
            dispatch(editorListStatus(LOADING_STATUS.ERROR));
        });
    }
}

export type editorListAction = 
    | ReturnType<typeof editorListSetValues>
    | ReturnType<typeof editorListSetIndex>
    | ReturnType<typeof editorListClear>
    | ReturnType<typeof editorListSetViewValue>
    | ReturnType<typeof editorListStatus>
