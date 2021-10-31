import { typeRedisApi } from '../services/viewer';

declare global {
    interface Window {
        redisAPI: typeRedisApi;
    }
}

export const redisAPI = window.redisAPI;