import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import * as reducers from 'reducers';
import { reducer as formReducer } from 'redux-form';

export const history = createHistory();

const middlewares = [
  thunk,
  routerMiddleware(history)
];

export default createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
    form: formReducer
  }),
  undefined,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
