import { viewerReducer } from './viewer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    viewerReducer,
}), applyMiddleware(thunk))
