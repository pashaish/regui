import { redisClient } from "../../common";

export const EDITOR_HASH_SET_FIELDS = "SET_FIELDS";

export const editorHashSetFields = (fields: string[]) => {
    return {
        type: EDITOR_HASH_SET_FIELDS as typeof EDITOR_HASH_SET_FIELDS,
        payload: {
            fields,
        }
    }
}

export const editorHashGetFields = (key: string, field: string) => {
    return (dispatch: Function) => {
        const limit = 500;
        const filterField = `*${field.trim()}*` || '*';
        const stream = redisClient.hscanStream(key, {
            count: 100,
            match: filterField,
        });

        const resultFields: string[] = [];
        stream.on('data', (chunk: string[]) => {
            resultFields.push(...chunk);
            dispatch(editorHashSetFields(chunk));
            if (resultFields.length >= limit) {
                stream.destroy();
            }
        });
    }
};


export type editorHashAction = 
    | ReturnType<typeof editorHashSetFields>
