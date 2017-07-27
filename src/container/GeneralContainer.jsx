import React from 'react';
import {connect} from 'react-redux';
//import {fetchStats} from '../store/reducer-general';

class generalContainer extends React.Component {
  constructor(){
    super();

    /*
    this.getStats = this.getStats.bind(this);
    this.multiGetStats = this.multiGetStats.bind(this);
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

  getStats(name){
    return this.props.fetchStats(
      name,
      this.props[`${name}Etag`],
    );
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
    console.log('generalContainer props:',this.props);

    return (
      <div className="row">
        {tables.map(name =>
          <div key={name} className="col-lg-3 col-md-3">
            <GeneralTableBody
              lastUpdate={this.props[`${name}LastUpdate`]}
              lastPoll={this.props[`${name}LastPoll`]}
              stars={this.props[`${name}Stars`]}
              watchers={this.props[`${name}Watchers`]}
              forks={this.props[`${name}Forks`]}
              issues={this.props[`${name}Issues`]}
            />
          </div>
        )}
        {/*<button onClick={this.multiGetStats}>get</button>*/}
      </div>
    );
  }
}

const mapState = (state) => {
  let obj={};
  Object.keys(state.general).forEach(repo => {
    Object.keys(state.general[repo]).forEach(prop => {
      //capitalize first letter
      let name = prop.charAt(0).toUpperCase() + prop.slice(1);

      obj[`${repo}${name}`] = state.general[repo][prop];
    });
  });

  return obj;
}

/*
const mapDispatch = {
  fetchStats
}
*/

//export default connect(mapState,mapDispatch)(generalContainer);
export default connect(mapState)(generalContainer);

const GeneralTableBody = (props) => {
  const lastUpdate = props.lastUpdate;
  const lastPoll = props.lastPoll;
  const stars = props.stars;
  const watchers = props.watchers;
  const forks = props.forks;
  const issues = props.issues;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan={2}>General</th>
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
            <td>Stars</td>
            <td>{stars}</td>
          </tr>
          <tr>
            <td>Watchers</td>
            <td>{watchers}</td>
          </tr>
          <tr>
            <td>Forks</td>
            <td>{forks}</td>
          </tr>
          <tr>
            <td>Issues</td>
            <td>{issues}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
