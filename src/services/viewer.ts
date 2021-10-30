import { contextBridge } from 'electron';
import redis from 'redis';

const client = redis.createClient();

contextBridge?.exposeInMainWorld('redisAPI', {
    getKeys: (pattern = '*') => {
        return new Promise((res, rej) => {
            client.keys(pattern, (err, keys) => {
                if (err) {
                    rej(err);
                } else {
                    res(createTreeByKeys(keys));
                }
            });
        });
    },
    defineType: (key: string) => {
        return new Promise((res, rej) => {
            client.type(key, (err, type) => {
                if (err) {
                    rej(err);
                } else {
                    res(type);
                }
            });
        });
    }
});

export function createTreeByKeys(keys: string[]) {
    const tree = {};
    for (const key of keys) {
        const parts = key.split(':');
        let cursor: any = tree;
        for (const part of parts) {
            cursor[part] = cursor[part] || {};
            cursor = cursor[part];
        }
    }
    return tree;
}