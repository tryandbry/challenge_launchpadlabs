import React from 'react';
import watcher from '../api/watcher';

export default class repoContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      reactWatchers: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    watcher()
    .then(res => {
      this.setState({reactWatchers: res.data},
        ()=>console.log('new state:',this.state));
    })
    .catch(error => console.error('handleClick error:',error));
  }

  render(){
    console.log('repoContainer is rendering');

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Watchers</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <h3>Watchers</h3>
        {this.state.reactWatchers.map(user =>
          <User
            key={user.login}
            login={user.login}
            thumbnail={user.avatar_url}
            url={user.html_url}
          />
        )}
        <button onClick={this.handleClick}>Watcher</button>
      </div>
    );
  }
}

const User = (props) => {
  console.log('props:',props);

  const login = props.login;
  const thumbnail = props.thumbnail;
  const url = props.url;

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td rowSpan={2}>
              <img className="thumbnail" src={thumbnail}></img>
            </td>
            <th>{login}</th>
          </tr>
          <tr>
            <th>URL:</th>
            <td><a href={url}>{url}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}








