import _ from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";

export const EDITOR_SET_SET_VALUES = "EDITOR_SET_SET_VALUES";
export const EDITOR_SET_SET_CURRENT_VALUE = "EDITOR_SET_SET_CURRENT_VALUE";
export const EDITOR_SET_CLEAR = "EDITOR_SET_CLEAR";
export const EDITOR_SET_SET_VIEW_VALUE = "EDITOR_SET_SET_VIEW_VALUE";
export const EDITOR_SET_STATUS = "EDITOR_SET_STATUS";

export const editorSetSetValues = (values: string[]) => {
    return {
        type: EDITOR_SET_SET_VALUES as typeof EDITOR_SET_SET_VALUES,
        payload: {
            values,
        },
    }
}

export const editorSetGetValues = () => {
    return async (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();

        const limit = 500;
        const values = await redisClient().srandmember(state.viewerReducer.key, limit);

        dispatch(editorSetSetValues([...values]));
        const value = values.find(e => e === state.editors.editorSetReducer.currentValue);
        dispatch(editorSetSetViewValue(value || ''));
    }
}

export const editorSetSetValue = (value: string) => {
    return {
        type: EDITOR_SET_SET_CURRENT_VALUE as typeof EDITOR_SET_SET_CURRENT_VALUE,
        payload: {
            value,
        }
    }
}

export const editorSetClear = () => {
    return {
        type: EDITOR_SET_CLEAR as typeof EDITOR_SET_CLEAR,
    }
}

export const editorSetSetViewValue = (value: string) => {
    return {
        type: EDITOR_SET_SET_VIEW_VALUE as typeof EDITOR_SET_SET_VIEW_VALUE,
        payload: {
            value,
        },
    }
}

export const editorSetStatus = (status: loadingStatus) => {
    return {
        type: EDITOR_SET_STATUS as typeof EDITOR_SET_STATUS,
        paylaod: {
            status,
        }
    }
}

export const editorSetUpdate = () => {
    return async (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        dispatch(editorSetStatus(LOADING_STATUS.LOADING));

        try {
            await redisClient().srem(state.viewerReducer.key, state.editors.editorSetReducer.currentValue);
            await redisClient().sadd(state.viewerReducer.key, state.editors.editorSetReducer.viewValue);

            dispatch(editorSetGetValues())
            dispatch(editorSetStatus(LOADING_STATUS.LOADED));
        } catch (error) {
            dispatch(editorSetStatus(LOADING_STATUS.ERROR));
        }
    }
}

export type editorSetAction = 
    | ReturnType<typeof editorSetSetValues>
    | ReturnType<typeof editorSetSetValue>
    | ReturnType<typeof editorSetClear>
    | ReturnType<typeof editorSetSetViewValue>
    | ReturnType<typeof editorSetStatus>
