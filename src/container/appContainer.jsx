import React from 'react';

export default class appContainer extends React.Component {
  constructor(){
    super();
  }

  render(){
    console.log('appContainer is rendering');

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
/*
export default (props) => {

  console.log('appContainer is rendering');

  return (
    <div>
      <h2>Looks Ma!  I has React werking!!1</h2>
    </div>
  );
}
*/
