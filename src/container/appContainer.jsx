import React from 'react';
import {connect} from 'react-redux';

import {fetchStats} from '../store/reducer-general';
import {fetchCommitCount} from '../store/reducer-commit';

import Navbar from '../component/Navbar';

class appContainer extends React.Component {
  constructor(){
    super();

    this.multiGetGeneralStats = this.multiGetGeneralStats.bind(this);
    this.getGeneralStats = this.getGeneralStats.bind(this);
    this.multiGetCommitStats = this.multiGetCommitStats.bind(this);
    this.multiRefreshCommitStats = this.multiRefreshCommitStats.bind(this);
    this.getCommitStats = this.getCommitStats.bind(this);
    this.refreshCommitStats = this.refreshCommitStats.bind(this);
  }

  componentDidMount(){
    this.multiGetGeneralStats();
  }

  // GeneralContainer
  multiGetGeneralStats(){
    return this.getGeneralStats('react')
    .then(() => this.getGeneralStats('angular'))
    .then(() => this.getGeneralStats('ember'))
    .then(() => this.getGeneralStats('vue'))
    .catch(error => console.error('multiGetGeneralStats:',error));
  }

  getGeneralStats(name){
    return this.props.fetchStats(
      name,
      this.props[`${name}Etag`],
    );
  }
  // GeneralContainer - END

  // CommitContainer
  multiGetCommitStats(){
    return this.getCommitStats('react')
    .then(() => this.getCommitStats('angular'))
    .then(() => this.getCommitStats('ember'))
    .then(() => this.getCommitStats('vue'))
    .catch(error => console.error('multiGetCommitStats:',error));
  }

  multiRefreshCommitStats(){
    this.refreshCommitStats('react')
    .then(() => this.refreshCommitStats('angular'))
    .then(() => this.refreshCommitStats('ember'))
    .then(() => this.refreshCommitStats('vue'))
    .catch(error => console.error('multiRefreshCommitStats:',error));
  }

  getCommitStats(name){
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
    .catch(error => console.error('getCommitStats:',error));
  }

  refreshCommitStats(name){
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
