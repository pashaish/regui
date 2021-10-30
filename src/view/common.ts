
declare global {
    interface Window {
        redisAPI: {
            getKeys: (pattern?: string) => Promise<Object>;
            defineType: (key: string) => Promise<string>;
        }
    }
}

export const redisAPI = window.redisAPI;