import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import appContainer from './container/appContainer';
import detailContainer from './container/detailContainer';
import dashContainer from './container/dashContainer';

render(
  <Router history={browserHistory}>
    <Route path="/" component={appContainer}>
      <IndexRoute component={dashContainer} />
    </Route>
  </Router>
  , 
  document.getElementById('main')
);


/*
      <IndexRoute component={detailContainer} />
*/
