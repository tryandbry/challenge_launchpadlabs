import React from 'react';
import watcher from '../api/watcher';

export default class repoContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      reactWatchers: [],
      eTag: '',
      lastUpdated: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    watcher(this.state.eTag)
    .then(res => {
      console.log('gitHub API response:',res);
      this.setState({
        reactWatchers: res.data,
        eTag: res.headers.etag,
        lastUpdated: Date(),
      },
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
            key={user.id}
            id={user.id}
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
  //console.log('props:',props);

  const login = props.login;
  const id = props.id;
  const thumbnail = props.thumbnail;
  const url = props.url;

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td rowSpan={3}>
              <img className="thumbnail" src={thumbnail}></img>
            </td>
            <th>Name:</th>
            <td>{login}</td>
          </tr>
          <tr>
            <th>ID:</th>
            <td>{id}</td>
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








