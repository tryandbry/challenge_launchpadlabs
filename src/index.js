import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import appContainer from './container/appContainer';
import detailContainer from './container/detailContainer';
import dashContainer from './container/dashContainer';
import commitContainer from './container/commitContainer';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={appContainer}>
        <IndexRoute component={commitContainer} />
      </Route>
    </Router>
  </Provider>
  , 
  document.getElementById('main')
);


/*
        <IndexRoute component={dashContainer} />
        <IndexRoute component={detailContainer} />
*/
