import { contextBridge } from 'electron';
import redis from 'redis';

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
})
const client = redis.createClient();


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