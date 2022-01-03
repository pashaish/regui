import _ from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";

export const EDITOR_ZSET_SET_VALUES = "EDITOR_ZSET_SET_VALUES";
export const EDITOR_ZSET_SET_CURRENT_VALUE = "EDITOR_ZSET_SET_CURRENT_VALUE";
export const EDITOR_ZSET_CLEAR = "EDITOR_ZSET_CLEAR";
export const EDITOR_ZSET_SET_VIEW_VALUE = "EDITOR_ZSET_SET_VIEW_VALUE";
export const EDITOR_ZSET_STATUS = "EDITOR_ZSET_STATUS";

export const editorZSetSetValues = (values: [string, string][]) => {
    return {
        type: EDITOR_ZSET_SET_VALUES as typeof EDITOR_ZSET_SET_VALUES,
        payload: {
            values,
        },
    }
}

export const editorZSetGetValues = (key: string, fieldFilter?: string) => {
    return (dispatch: Function) => {
        const limit = 500;
        const filterField = fieldFilter ? `*${fieldFilter.trim()}*` : '*';
        const stream = redisClient().zscanStream(key, {
            count: 100,
            match: filterField,
        });

        const resultFields: [string, string][] = [];
        stream.on('data', (chunk: string[]) => {
            const formatChunk = _.chunk(chunk, 2).map(([value, mass]) => [mass, value]) as [string, string][];
            resultFields.push(...formatChunk);
            dispatch(editorZSetSetValues(resultFields));
            if (resultFields.length >= limit) {
                stream.destroy();
            }
        });
    }
}

export const editorZSetSetValue = (value: string, mass?: string) => {
    return {
        type: EDITOR_ZSET_SET_CURRENT_VALUE as typeof EDITOR_ZSET_SET_CURRENT_VALUE,
        payload: {
            value,
            mass,
        }
    }
}

export const editorZSetClear = () => {
    return {
        type: EDITOR_ZSET_CLEAR as typeof EDITOR_ZSET_CLEAR,
    }
}

export const editorZSetSetViewValue = (value: string, mass?: string) => {
    return {
        type: EDITOR_ZSET_SET_VIEW_VALUE as typeof EDITOR_ZSET_SET_VIEW_VALUE,
        payload: {
            value,
            mass,
        },
    }
}

export const editorZSetStatus = (status: loadingStatus) => {
    return {
        type: EDITOR_ZSET_STATUS as typeof EDITOR_ZSET_STATUS,
        paylaod: {
            status,
        }
    }
}

export const editorZSetUpdate = () => {
    return async (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        dispatch(editorZSetStatus(LOADING_STATUS.LOADING));

        try {
            await redisClient().zrem(state.viewerReducer.key, state.editors.editorZSetReducer.currentValue[1]);
            await redisClient().zadd(state.viewerReducer.key, ...state.editors.editorZSetReducer.viewValue);

            dispatch(editorZSetGetValues(state.viewerReducer.key));
            dispatch(editorZSetSetValue(state.editors.editorZSetReducer.viewValue[1], state.editors.editorZSetReducer.viewValue[0]));
            dispatch(editorZSetStatus(LOADING_STATUS.LOADED));
        } catch (error) {
            dispatch(editorZSetStatus(LOADING_STATUS.ERROR));
        }
    }
}

export type editorZSetAction = 
    | ReturnType<typeof editorZSetSetValues>
    | ReturnType<typeof editorZSetSetValue>
    | ReturnType<typeof editorZSetClear>
    | ReturnType<typeof editorZSetSetViewValue>
    | ReturnType<typeof editorZSetStatus>
