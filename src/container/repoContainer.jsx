import React from 'react';

export default class repoContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      facebook: {
        stats: {
          stars: 123123,
          watchers: 123123,
          forks: 123123,
          subscribers: 123123,
        }
      }
    };
  }

  render(){
    console.log('repoContainer is rendering');

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Facebook React</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2}>Statistics</th>
            </tr>
            <tr>
              <th># stars:</th>
              <td>{this.state.facebook.stats.stars}</td>
            </tr>
            <tr>
              <th># watchers:</th>
              <td>{this.state.facebook.stats.watchers}</td>
            </tr>
            <tr>
              <th># forks:</th>
              <td>{this.state.facebook.stats.forks}</td>
            </tr>
            <tr>
              <th># subscribers:</th>
              <td>{this.state.facebook.stats.subscribers}</td>
            </tr>
          </tbody>
        </table>
        <ul className="nav nav-tabs">
          <li role="presentation"><a>Watchers</a></li>
          <li role="presentation"><a>Stars</a></li>
          <li role="presentation"><a>Forks</a></li>
        </ul>
      </div>
    );
  }
}

const User = (props) => {

  return (
    <div>
      <table className="table">
        <tr>
          <td rowSpan={2}><img className="thumbnail" src="https://avatars2.githubusercontent.com/u/25852756?v=4"></img></td>
          <th>tryandbry</th>
        </tr>
        <tr>
          <th>URL:</th>
          <td><a href="https://api.github.com/users/tryandbry">https://api.github.com/users/tryandbry</a></td>
        </tr>
      </table>
    </div>
  );
}








