import React from 'react';
import {connect} from 'react-redux';
import {fetchCommitCount} from '../store/reducer-commit';

class commitContainer extends React.Component {
  constructor(){
    super();
    this.state = {
    };

    this.refreshStats = this.refreshStats.bind(this);
  }

  refreshStats(){
    this.props.fetchCommitCount('react',1);
  }
  
  render(){
    const tables = ['react'];
    console.log('commitContainer props:',this.props);
    console.log('commitContainer state:',this.state);

    return (
      <div className="row">
        {tables.map(name =>
          <div className="col-lg-3 col-md-3">
            <h3>{name}</h3>
            <CommitTableBody
              day1={this.state[name].day1}
            />
          </div>
        )}
        <button onClick={this.refreshStats}>update</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  react: state.commit.react,
})

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
