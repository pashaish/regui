import { viewerReducer } from './viewer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { useSelector as useSelectorDefault } from 'react-redux';
import { composeWithDevTools } from 'remote-redux-devtools';

const composeEnhancers = composeWithDevTools({
    realtime: true,
    port: 8000,
    hostname: 'localhost',
});


export const store = createStore(
    combineReducers({
        viewerReducer,
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
        )
    ),
)

type selectorHookType = <R>(cb: (state: ReturnType<typeof store.getState>) => R) => R;
export const useSelector: selectorHookType = useSelectorDefault as any;
