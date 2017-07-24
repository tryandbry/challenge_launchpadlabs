import React from 'react';
import watcher from '../api/watcher';

export default class detailContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      reactWatchers: [],
      eTag: '',
      lastUpdated: '',
      filterUser: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.searchUser = this.searchUser.bind(this);
  }

  handleClick(){
    watcher(this.state.eTag)
    .then(res => {
      console.log('gitHub API response:',res);
      this.setState({
        reactWatchers: res.data,
        eTag: res.headers.etag,
        lastUpdated: Date(),
        searchUser: '',
      },
        ()=>console.log('new state:',this.state));
    })
    .catch(error => console.error('handleClick error:',error));
  }

  searchUser(event){
    event.preventDefault();
    this.setState({searchUser: event.target.value});
  }

  render(){
    const filteredUsers = this.state.reactWatchers.filter(user => 
      user.login.match(this.state.searchUser)
    );

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
        <FilterUser searchUser={this.searchUser} />
        {filteredUsers.map(user =>
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

const FilterUser = (props) => {
  const searchUser = props.searchUser;

  return (
    <div>
      <form className="form-group">
        <input
          className="form-control"
          name="users"
          onChange={searchUser}
          placeholder="search user"
        />
      </form>
    </div>
  );
}

const User = (props) => {
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








