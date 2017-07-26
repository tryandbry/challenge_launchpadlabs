import React from 'react';
import GeneralContainer from './GeneralContainer';
import CommitContainer from './CommitContainer';

export default class DashContainer extends React.Component {
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
        <div className="row">
          <GeneralContainer />
        </div>
        <div className="row">
          <CommitContainer />
        </div>
      </div>
    );
  }
}
