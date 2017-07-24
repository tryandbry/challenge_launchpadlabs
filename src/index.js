import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import appContainer from './container/appContainer';
import repoContainer from './container/repoContainer';

render(
  <Router history={browserHistory}>
    <Route path="/" component={appContainer}>
      <IndexRoute component={repoContainer} />
    </Route>
  </Router>
  , 
  document.getElementById('main')
);
