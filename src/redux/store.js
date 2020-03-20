import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import admin_redusers from './redusers/admin_redusers'

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    admin:admin_redusers
})

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;