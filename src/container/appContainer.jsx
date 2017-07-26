import React from 'react';
import Navbar from '../component/Navbar';

export default class appContainer extends React.Component {
  constructor(){
    super();
  }

  render(){

    return (
      <div>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
