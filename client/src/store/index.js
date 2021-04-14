import { createStore, applyMiddleware, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import combineReducers from '../redux/reducers/combineReducers.js';

const store = createStore(

  combineReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
