import _ from "lodash";
import { redisClient } from "../../common";
import { loadingStatus, LOADING_STATUS } from "../constants/loading";
import { store } from "../reducers";
import { EDITOR_LIST_CLEAR } from "./editor-list";
import { EDITOR_STRING_VIEW_VALUE } from "./editor-string";

export const EDITOR_HASH_SET_FIELDS = "EDITOR_HASH_SET_FIELDS";
export const EDITOR_HASH_SET_VALUE = "EDITOR_HASH_SET_VALUE";
export const EDITOR_HASH_CLEAR = "EDITOR_HASH_CLEAR";
export const EDITOR_HASH_SET_VIEW_VALUE = "EDITOR_HASH_SET_VIEW_VALUE";
export const EDITOR_HASH_STATUS = "EDITOR_HASH_STATUS";

export const editorHashSetFields = (fields: string[]) => {
    return {
        type: EDITOR_HASH_SET_FIELDS as typeof EDITOR_HASH_SET_FIELDS,
        payload: {
            fields,
        }
    }
}

export const editorHashGetFields = (key: string, fieldFilter?: string) => {
    return (dispatch: Function) => {
        const limit = 500;
        const filterField = fieldFilter ? `*${fieldFilter.trim()}*` : '*';
        const stream = redisClient.hscanStream(key, {
            count: 100,
            match: filterField,
        });

        const resultFields: string[] = [];
        stream.on('data', (chunk: string[]) => {
            const formatChunk = _.chunk(chunk, 2).map(([field, value]) => field);
            resultFields.push(...formatChunk);
            dispatch(editorHashSetFields(resultFields));
            if (resultFields.length >= limit) {
                stream.destroy();
            }
        });
    }
};

export const editorHashSetValue = (value: string, field: string) => {
    return {
        type: EDITOR_HASH_SET_VALUE as typeof EDITOR_HASH_SET_VALUE,
        payloads: {
            value,
            field,
        },
    }
}

export const editorHashGetValue = (field: string) => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        redisClient.hget(state.viewerReducer.key, field).then(value => {
            dispatch(editorHashSetValue(value || '', field));
        });
    }
}

export const editorHashStatus = (status: loadingStatus) => {
    return {
        type: EDITOR_HASH_STATUS as typeof EDITOR_HASH_STATUS,
        payload: {
            status,
        },
    }
}

export const editorHashUpdate = () => {
    return (dispatch: Function, getState: () => ReturnType<typeof store.getState>) => {
        const state = getState();
        dispatch(editorHashStatus(LOADING_STATUS.LOADING));
        redisClient.hset(
            state.viewerReducer.key,
            [state.editors.editorHashReducer.currentField, state.editors.editorHashReducer.viewValue],
        ).then((value) => {
            dispatch(editorHashStatus(LOADING_STATUS.LOADED));
        }).catch((err) => {
            dispatch(editorHashStatus(LOADING_STATUS.ERROR));
        });
    }
}

export const editorHashClear = () => {
    return {
        type: EDITOR_LIST_CLEAR as typeof EDITOR_LIST_CLEAR,
    }
}

export const editorHashSetViewValue = (value: string) => {
    return {
        type: EDITOR_STRING_VIEW_VALUE as typeof EDITOR_STRING_VIEW_VALUE,
        payload: {
            value,
        }
    }
}

export type editorHashAction = 
    | ReturnType<typeof editorHashSetFields>
    | ReturnType<typeof editorHashSetValue>
    | ReturnType<typeof editorHashClear>
    | ReturnType<typeof editorHashStatus>
    | ReturnType<typeof editorHashSetViewValue>
