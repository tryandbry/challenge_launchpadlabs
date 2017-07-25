import React from 'react';
import dash from '../api/dash';
import {updateStats} from '../api/dash';

export default class detailContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      react: {
        eTag: '',
      },
      notification: '',
    };
  }

  componentDidMount(){
    let reactAPI = dash('facebook','react');
    updateStats(this,reactAPI,'react');
    this.updateReact = updateStats.bind(null,this,reactAPI,'react');
    this.unsetTimer = setInterval(this.updateReact,5000);
  }

  componentWillUnmount(){
    clearInterval(this.unsetTimer);
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <h3>Notification: {this.state.notification}</h3>
            <RepoTable
              title="react"
              stars={this.state.react.stars}
              watchers={this.state.react.watchers}
              forks={this.state.react.forks}
              issues={this.state.react.issues}
            />
            <button onClick={this.updateReact}>update</button>
          </div>
        </div>
      </div>
    );
  }
}

const RepoTable = (props) => {

  const title = props.title;
  const stars = props.stars;
  const watchers = props.watchers;
  const forks = props.forks;
  const issues = props.issues;

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Stars</th>
            <td>{stars}</td>
          </tr>
          <tr>
            <th>Watchers</th>
            <td>{watchers}</td>
          </tr>
          <tr>
            <th>Forks</th>
            <td>{forks}</td>
          </tr>
          <tr>
            <th>Issues</th>
            <td>{issues}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
