
export type loadingStatus = 'LOADING' | 'LOADED' | 'ERROR' | 'NORMAL';

export const LOADING_STATUS: Record<loadingStatus, loadingStatus> = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR',
    NORMAL: 'NORMAL',
}
