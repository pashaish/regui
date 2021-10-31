import Redis from 'ioredis';

export const redisClient = new Redis();


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