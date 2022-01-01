import Redis from 'ioredis';
import { LocalStorage } from 'node-localstorage';

export let connectionID = -1;

export const redisClient = () => {

    return new Redis();
};

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