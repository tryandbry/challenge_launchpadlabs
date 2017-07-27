import React from 'react';
import {connect} from 'react-redux';
//import {fetchCommitCount} from '../store/reducer-commit';

class commitContainer extends React.Component {
  constructor(){
    super();

    /*
    this.getStats = this.getStats.bind(this);
    this.multiGetStats = this.multiGetStats.bind(this);
    this.refreshStats = this.refreshStats.bind(this);
    this.multiRefreshStats = this.multiRefreshStats.bind(this);
    */
  }

  /*
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
  */

  /*
  componentDidMount(){
    this.timer = setInterval(this.refreshStats,30000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }
  */
  
  render(){
    const tables = ['react','angular','ember','vue'];
    console.log('commitContainer props:',this.props);

    return (
      <div className="row">
        {tables.map(name =>
          <div key={name} className="col-lg-3 col-md-3">
            <CommitTableBody
              lastUpdate={this.props[`${name}CommitLastUpdate`]}
              lastPoll={this.props[`${name}CommitLastPoll`]}
              day1={this.props[`${name}CommitDay1`]}
              day7={this.props[`${name}CommitDay7`]}
              day30={this.props[`${name}CommitDay30`]}
            />
          </div>
        )}
        {/*<button onClick={this.multiGetStats}>get</button>
        <button onClick={this.multiRefreshStats}>refresh</button>*/}
      </div>
    );
  }
}

const mapState = (state) => {
  let obj={};
  Object.keys(state.commit).forEach(repo => {
    Object.keys(state.commit[repo]).forEach(prop => {
      //capitalize first letter
      let name = prop.charAt(0).toUpperCase() + prop.slice(1);

      obj[`${repo}Commit${name}`] = state.commit[repo][prop];
    });
  });

  return obj;
}

/*
const mapDispatch = {
  fetchCommitCount
}
*/

//export default connect(mapState,mapDispatch)(commitContainer);
export default connect(mapState)(commitContainer);

const CommitTableBody = (props) => {
  const lastUpdate = props.lastUpdate;
  const lastPoll = props.lastPoll;
  const day1 = props.day1;
  const day7 = props.day7;
  const day30 = props.day30;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan={2}>Commits</th>
          </tr>
          <tr>
            <td>Last Update</td>
            <td>{lastUpdate}</td>
          </tr>
          <tr>
            <td>Last Poll</td>
            <td>{lastPoll}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Since yesterday</td>
            <td>{day1}</td>
          </tr>
          <tr>
            <td>Since last week</td>
            <td>{day7}</td>
          </tr>
          <tr>
            <td>Since last month</td>
            <td>{day30}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
