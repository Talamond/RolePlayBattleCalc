import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createActions } from './storeActions';
import * as reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { routerStateReducer } from 'redux-react-router';

const reducersApp = combineReducers({router: routerStateReducer, ...reducers});

const finalCreateStore = (__DEVELOPMENT__) ? compose(
	applyMiddleware(logger, thunkMiddleware),
	createStore
) : compose(
	applyMiddleware(thunkMiddleware),
	createStore
);

export const store = finalCreateStore(reducersApp);

if (store.dispatch) {
	createActions(store);
}

window.store = store;
