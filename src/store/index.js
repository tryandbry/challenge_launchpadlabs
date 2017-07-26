import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//compose reducers
import commit from './reducer-commit';
const reducer = combineReducers({
  commit,
});
//compose reducers - END

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(createLogger,thunkMiddleware)
  )
);
