import { viewerReducer } from './viewer';
import { editorHashReducer } from './editor-hash';
import { editorListReducer } from './editor-list';
import { editorSetReducer } from './editor-set';
import { editorZSetReducer } from './editor-zset';
import { editorStringReducer } from './editor-string';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { useSelector as useSelectorDefault } from 'react-redux';

export const store = createStore(
    combineReducers({
        viewerReducer,
        editors: combineReducers({
            editorHashReducer,
            editorListReducer,
            editorSetReducer,
            editorZSetReducer,
            editorStringReducer,
        })
    }),
    applyMiddleware(
        thunk,
    )
)

type selectorHookType = <R>(cb: (state: ReturnType<typeof store.getState>) => R) => R;
export const useSelector: selectorHookType = useSelectorDefault as any;
