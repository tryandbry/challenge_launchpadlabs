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
    this.multiGetCommitStats();

    this.generalTimer = setInterval(
      this.multiGetGeneralStats,
      29000
    );
    this.commitTimer = setInterval(
      this.multiRefreshCommitStats,
      37000
    );
  }

  componentWillUnmount(){
    clearInterval(this.generalTimer);
    clearInterval(this.commitTimer);
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
      this.props[`${name}GeneralEtag`],
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
      this.props[`${name}CommitEtag30`],
    )
    .then(() =>
      this.props.fetchCommitCount(
        name,
        7,
        this.props[`${name}CommitEtag7`],
      )
    )
    .then(() =>
      this.props.fetchCommitCount(
        name,
        1,
        this.props[`${name}CommitEtag1`],
      )
    )
    .catch(error => console.error('getCommitStats:',error));
  }

  refreshCommitStats(name){
    return this.props.fetchCommitCount(
      name,
      1,
      this.props[`${name}CommitEtag1`],
      true
    )
  }
  // CommitContainer - END

  render(){
    //console.log('appContainer props:',this.props);

    return (
      <div>
        <div className="container">
          <Navbar 
            pathname={this.props.location.pathname}
          />
          <div id="offset" />
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  let obj={};

  //map general etags
  Object.keys(state.general).forEach(repo => {
    obj[`${repo}GeneralEtag`] = state.general[repo].etag;
  });

  //map commit etags
  Object.keys(state.commit).forEach(repo => {
    obj[`${repo}CommitEtag1`] = state.commit[repo].etag1;
    obj[`${repo}CommitEtag7`] = state.commit[repo].etag7;
    obj[`${repo}CommitEtag30`] = state.commit[repo].etag30;
  });

  return obj;
}

const mapDispatch = {
  fetchStats,
  fetchCommitCount,
}

export default connect(mapState,mapDispatch)(appContainer);
