import { contextBridge } from 'electron';
import Redis from 'ioredis';

export const redisClient = new Redis();

const redisAPI = {
    getKeys: (pattern = '*') => new Promise<Object>((res, rej) => {
        redisClient.keys(pattern, (err, keys) => {
            if (err) {
                rej(err);
            } else {
                res(createTreeByKeys(keys));
            }
        });
    }),
    defineType: (key: string) => new Promise<string>((res, rej) => {
        redisClient.type(key, (err, type) => {
            if (err) {
                rej(err);
            } else {
                res(type);
            }
        });
    }),
    get: (key: string) => new Promise<string | null>((res, rej) => {
        redisClient.get(key, (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        });
    }),
    hget: (key: string, field: string) => new Promise<string | null>((res, rej) => {
        redisClient.hget(key, field, (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        });
    }),
};

// @ts-ignore
global.redisAPI = redisAPI;
export type typeRedisApi = typeof redisAPI;

// contextBridge?.exposeInMainWorld('redisAPI', redisAPI);



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