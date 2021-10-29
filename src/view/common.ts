
declare global {
    interface Window {
        redisAPI: {
            getKeys: (pattern?: string) => Promise<Object>
        }
    }
}

export const redisAPI = window.redisAPI;