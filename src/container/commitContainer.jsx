import React from 'react';
import {connect} from 'react-redux';
import {fetchCommitCount} from '../store/reducer-commit';

class commitContainer extends React.Component {
  constructor(){
    super();

    this.refreshStats = this.refreshStats.bind(this);
  }

  refreshStats(){
    let etag = this.props.reactEtag1;
    this.props.fetchCommitCount('react',1,etag);
  }
  
  render(){
    const tables = ['react'];
    console.log('commitContainer props:',this.props);

    return (
      <div className="row">
        {tables.map(name =>
          <div key={name} className="col-lg-3 col-md-3">
            <h3>{name}</h3>
            <CommitTableBody
              day1={this.props.reactDay1}
            />
          </div>
        )}
        <button onClick={this.refreshStats}>update</button>
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
  const day1 = props.day1;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan={2}>Commits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Since yesterday</th>
            <td>{day1}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
