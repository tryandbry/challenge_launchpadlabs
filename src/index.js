import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import appContainer from './container/appContainer';
import DashContainer from './container/DashContainer';
import CommitContainer from './container/CommitContainer';
import GeneralContainer from './container/GeneralContainer';
import DetailContainer from './container/DetailContainer';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={appContainer}>
        <IndexRoute component={DashContainer} />
        <Route path="/detail" component={DetailContainer} />
      </Route>
    </Router>
  </Provider>
  , 
  document.getElementById('main')
);
