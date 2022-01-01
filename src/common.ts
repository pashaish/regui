import Redis, { Redis as RedisType } from 'ioredis';
import { LocalStorage } from 'node-localstorage';
import { deleteActiveConnection, getActiveConnection } from './storage/connections';
import { viewerActionResetState } from './view/actions/viewerAction';
import { store } from './view/reducers';

export let connectionID = -1;

let redis: RedisType | null = null;

export function redisClientDisconnect() {
    if (redis) {
        store.dispatch(viewerActionResetState());
        redis.disconnect();
        deleteActiveConnection();
        redis = null;
    }
}

export const redisClient = () => {
    const conn = getActiveConnection();

    if (redis !== null) {
        return redis;
    }

    if (conn) {
        redis = new Redis(conn.port, conn.host, {
            username: conn.username || '',
            password: conn.password || '',
            retryStrategy: () => null,
        });

        return redis;
    }

    throw new Error('Redis not connected');
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