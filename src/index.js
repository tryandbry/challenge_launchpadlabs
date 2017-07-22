import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import appContainer from './container/appContainer';

render(
  <Router history={browserHistory}>
    <Route path="/" component={appContainer}>
    </Route>
  </Router>
  , 
  document.getElementById('main')
);
