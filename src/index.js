import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import appContainer from './container/appContainer';
import commitContainer from './container/commitContainer';
import generalContainer from './container/generalContainer';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={appContainer}>
        <IndexRoute component={generalContainer} />
      </Route>
    </Router>
  </Provider>
  , 
  document.getElementById('main')
);


/*
        <IndexRoute component={commitContainer} />
*/
