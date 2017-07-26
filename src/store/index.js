import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//compose reducers
import commit from './reducer-commit';
import general from './reducer-general';
import control from './reducer-control';
const reducer = combineReducers({
  commit,
  general,
  control,
});
//compose reducers - END

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(createLogger,thunkMiddleware)
  )
);
