import _ from "lodash";
import { redisClient } from "../../common";
import { store } from "../reducers";
import { EDITOR_LIST_CLEAR } from "./editor-list";

export const EDITOR_HASH_SET_FIELDS = "EDITOR_HASH_SET_FIELDS";
export const EDITOR_HASH_SET_VALUE = "EDITOR_HASH_SET_VALUE";
export const EDITOR_HASH_CLEAR = "EDITOR_HASH_CLEAR";

export const editorHashSetFields = (fields: string[]) => {
    return {
        type: EDITOR_HASH_SET_FIELDS as typeof EDITOR_HASH_SET_FIELDS,
        payload: {
            fields,
        }
    }
}

export const editorHashGetFields = (key: string, fieldFilter: string) => {
    return (dispatch: Function) => {
        const limit = 500;
        const filterField = `*${fieldFilter.trim()}*` || '*';
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
        redisClient.hget(state.viewerReducer.currentKey, field).then(value => {
            dispatch(editorHashSetValue(value || '', field));
        });
    }
}

export const editorHashClear = () => {
    return {
        type: EDITOR_LIST_CLEAR as typeof EDITOR_LIST_CLEAR,
    }
}

export type editorHashAction = 
    | ReturnType<typeof editorHashSetFields>
    | ReturnType<typeof editorHashSetValue>
    | ReturnType<typeof editorHashClear>
