import React from 'react';
import {connect} from 'react-redux';

import {fetchStats} from '../store/reducer-general';
import {fetchCommitCount} from '../store/reducer-commit';

import Navbar from '../component/Navbar';

class appContainer extends React.Component {
  constructor(){
    super();
  }

  // GeneralContainer
  multiGetStats(){
    return this.getStats('react')
    .then(() => this.getStats('angular'))
    .then(() => this.getStats('ember'))
    .then(() => this.getStats('vue'))
    .catch(error => console.error('multiGetStats:',error));
  }

  getStats(name){
    return this.props.fetchStats(
      name,
      this.props[`${name}Etag`],
    );
  }
  // GeneralContainer - END

  // CommitContainer
  multiGetStats(){
    return this.getStats('react')
    .then(() => this.getStats('angular'))
    .then(() => this.getStats('ember'))
    .then(() => this.getStats('vue'))
    .catch(error => console.error('multiGetStats:',error));
  }

  multiRefreshStats(){
    this.refreshStats('react')
    .then(() => this.refreshStats('angular'))
    .then(() => this.refreshStats('ember'))
    .then(() => this.refreshStats('vue'))
    .catch(error => console.error('multiRefreshStats:',error));
  }

  getStats(name){
    return this.props.fetchCommitCount(
      name,
      30,
      this.props[`${name}Etag30`],
    )
    .then(() =>
      this.props.fetchCommitCount(
        name,
        7,
        this.props[`${name}Etag7`],
      )
    )
    .then(() =>
      this.props.fetchCommitCount(
        name,
        1,
        this.props[`${name}Etag1`],
      )
    )
    .catch(error => console.error('getStats:',error));
  }

  refreshStats(name){
    return this.props.fetchCommitCount(
      name,
      1,
      this.props[`${name}Etag1`],
      true
    )
  }
  // CommitContainer - END

  render(){

    return (
      <div>
        <div className="container">
          <Navbar />
          <div id="offset" />
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  fetchStats,
  fetchCommitCount,
}

export default connect(null,mapDispatch)(appContainer);
