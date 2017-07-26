import React from 'react';
import {connect} from 'react-redux';
import GeneralContainer from './GeneralContainer';
import CommitContainer from './CommitContainer';

class DashContainer extends React.Component {
  constructor(){
    super();

  }

  render(){

    return (
      <div>
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <h3>React</h3>
          </div>
          <div className="col-lg-3 col-md-3">
            <h3>Angular</h3>
          </div>
          <div className="col-lg-3 col-md-3">
            <h3>Ember</h3>
          </div>
          <div className="col-lg-3 col-md-3">
            <h3>Vue</h3>
          </div>
        </div>
        {this.props.general ? 
          <div className="row">
            <GeneralContainer />
          </div>
          : null}
        {this.props.commit ?
          <div className="row">
            <CommitContainer />
          </div>
          : null}
      </div>
    );
  }
}

const mapState = (state) => ({
  general: state.control.general,
  commit: state.control.commit
});

export default connect(mapState)(DashContainer);
