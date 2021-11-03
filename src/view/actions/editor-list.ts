import _, { values } from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";
import { editorStringStatus } from "./editor-string";

export const EDITOR_LIST_SET_VALUES = "EDITOR_LIST_SET_VALUES";
export const EDITOR_LIST_SET_INDEX = "EDITOR_LIST_SET_INDEX";
export const EDITOR_LIST_CLEAR = "EDITOR_LIST_CLEAR";
export const EDITOR_LIST_SET_VIEW_VALUE = "EDITOR_LIST_SET_VIEW_VALUE";
export const EDITOR_LIST_STATUS = "EDITOR_LIST_STATUS";

export const editorListSetValues = (values: [number, string][]) => {
    return {
        type: EDITOR_LIST_SET_VALUES as typeof EDITOR_LIST_SET_VALUES,
        payload: {
            values,
        },
    }
}

export const editorListGetValues = () => {
    return async (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();

        const limit = Math.min(500, await redisClient.llen(state.viewerReducer.key));
        const limitPerOperation = 1;
        const elements: [number, string][] = [];

        for (let i = limit; i > 0; i = limit - elements.length) {
            const values = await redisClient.lrange(state.viewerReducer.key, elements.length, (elements.length - 1) + limitPerOperation);

            elements.push(
                ...values.map((val, index) => [elements.length + index, val] as [number, string])
            );

            dispatch(editorListSetValues([...elements]));
        }

        const value = elements.find(e => e[0] === state.editors.editorListReducer.currentIndex)?.[1];
        
        dispatch(editorListSetViewValue(value || ''));
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

        redisClient.lset(
            state.viewerReducer.key,
            state.editors.editorListReducer.currentIndex,
            state.editors.editorListReducer.viewValue,
        ).then(() => {
            const pair = state.editors.editorListReducer.values.find(([index]) => index === state.editors.editorListReducer.currentIndex)!;
            pair[1] = state.editors.editorListReducer.viewValue;
            dispatch(editorListSetValues([...state.editors.editorListReducer.values]));
            dispatch(editorListStatus(LOADING_STATUS.LOADED));
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
