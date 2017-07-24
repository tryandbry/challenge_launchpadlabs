import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import appContainer from './container/appContainer';
import detailContainer from './container/detailContainer';
import repoContainer from './container/repoContainer';

render(
  <Router history={browserHistory}>
    <Route path="/" component={appContainer}>
      <IndexRoute component={detailContainer} />
    </Route>
  </Router>
  , 
  document.getElementById('main')
);
