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
      </div>
    );
  }
}
