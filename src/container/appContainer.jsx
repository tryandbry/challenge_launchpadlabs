import React from 'react';
import Navbar from '../component/Navbar';

export default class appContainer extends React.Component {
  constructor(){
    super();
  }

  render(){

    return (
      <div>
        <div className="container">
          <Navbar />
          <div id="offset" />
          {this.props.children}
        </div>
      </div>
    );
  }
}
