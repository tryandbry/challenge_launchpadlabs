import React from 'react';
import {connect} from 'react-redux';
import {fetchCommitCount} from '../store/reducer-commit';

class commitContainer extends React.Component {
  constructor(){
    super();

    this.getStats = this.getStats.bind(this);
    this.refreshStats = this.refreshStats.bind(this);
  }

  getStats(){
    this.props.fetchCommitCount(
      'react',
      30,
      this.props.reactEtag30
    )
    .then(() => 
      this.props.fetchCommitCount(
        'react',
        7,
        this.props.reactEtag7
      )
    )
    .then(() => 
      this.props.fetchCommitCount(
        'react',
        1,
        this.props.reactEtag1
      )
    )
    .catch(error => console.error('refreshStats:',error));
  }

  refreshStats(){
    this.props.fetchCommitCount(
      'react',
      1,
      this.props.reactEtag1,
      true
    )
  }

  /*
  componentDidMount(){
    this.timer = setInterval(this.refreshStats,30000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }
  */
  
  render(){
    const tables = ['react'];
    console.log('commitContainer props:',this.props);

    return (
      <div className="row">
        {tables.map(name =>
          <div key={name} className="col-lg-3 col-md-3">
            <h3>{name}</h3>
            <CommitTableBody
              lastUpdate={this.props.reactLastUpdate}
              lastPoll={this.props.reactLastPoll}
              day1={this.props.reactDay1}
              day7={this.props.reactDay7}
              day30={this.props.reactDay30}
            />
          </div>
        )}
        <button onClick={this.getStats}>get</button>
        <button onClick={this.refreshStats}>refresh</button>
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

      obj[`${repo}${name}`] = state.commit[repo][prop];
    });
  });

  return obj;
}

const mapDispatch = {
  fetchCommitCount
}

export default connect(mapState,mapDispatch)(commitContainer);

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
