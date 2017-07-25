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
      reactMsg: '',
      reactMsgLastUpdate: '',
      reactMsgLastPoll: '',
      angular: {
        eTag: '',
      },
      angularMsg: '',
      angularMsgLastUpdate: '',
      angularMsgLastPoll: '',
      ember: {
        eTag: '',
      },
      emberMsg: '',
      emberMsgLastUpdate: '',
      emberMsgLastPoll: '',
      vue: {
        eTag: '',
      },
      vueMsg: '',
      vueMsgLastUpdate: '',
      vueMsgLastPoll: '',
    };

    this.refreshStats = this.refreshStats.bind(this);
  }

  componentDidMount(){
    let reactAPI = dash('facebook','react');
    updateStats(this,reactAPI,'react');
    this.updateReact = updateStats.bind(null,this,reactAPI,'react');
    //this.unsetTimerReact = setInterval(this.updateReact,5000);

    let angularAPI = dash('angular','angular.js');
    updateStats(this,angularAPI,'angular');
    this.updateAngular = updateStats.bind(null,this,angularAPI,'angular');
    //this.unsetTimerAngular = setInterval(this.updateAngular,5000);

    let emberAPI = dash('emberjs','ember.js');
    updateStats(this,emberAPI,'ember');
    this.updateEmber = updateStats.bind(null,this,emberAPI,'ember');
    //this.unsetTimerEmber = setInterval(this.updateEmber,5000);

    let vueAPI = dash('vuejs','vue');
    updateStats(this,vueAPI,'vue');
    this.updateVue = updateStats.bind(null,this,vueAPI,'vue');
    //this.unsetTimerVue = setInterval(this.updateVue,5000);
  }

  refreshStats(){
    this.updateReact();
    this.updateAngular();
    this.updateEmber();
    this.updateVue();
  }

  componentWillUnmount(){
    /*
    clearInterval(this.unsetTimerReact);
    clearInterval(this.unsetTimerAngular);
    clearInterval(this.unsetTimerEmber);
    clearInterval(this.unsetTimerVue);
    */
  }

  render(){
    const tables = Object.keys(this.state).filter(n => !n.match('Msg'));

    return (
      <div className="row">
        {tables.map(name =>
          <div className="col-lg-3 col-md-3">
            <h3>{name}</h3>
            <RepoTableHeader
              msg={this.state[name+'Msg']}
              lastUpdate={this.state[name+'MsgLastUpdate']}
              lastPoll={this.state[name+'MsgLastPoll']}
            />
            <RepoTableBody
              stars={this.state[name].stars}
              watchers={this.state[name].watchers}
              forks={this.state[name].forks}
              issues={this.state[name].issues}
            />
          </div>
        )}
        <button onClick={this.refreshStats}>update</button>
      </div>
    );
  }
}

const RepoTableHeader = (props) => {

  const msg = props.msg;
  const lastPoll = props.lastPoll;
  const lastUpdate = props.lastUpdate;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Notification:</th>
            <td>{msg}</td>
          </tr>
          <tr>
            <th>Last Poll:</th>
            <td>{lastPoll}</td>
          </tr>
          <tr>
            <th>Last Update:</th>
            <td>{lastUpdate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const RepoTableBody = (props) => {

  const stars = props.stars;
  const watchers = props.watchers;
  const forks = props.forks;
  const issues = props.issues;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
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
