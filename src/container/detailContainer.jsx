import React from 'react';
import watcher from '../api/watcher';

const sortUsers = (arr,mode) => {
  let result = arr.slice();

  const sortAZ = (a,b) => {
    a = a.login.toLowerCase();
    b = b.login.toLowerCase();

    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
  }

  const sortZA = (a,b) => {
    a = a.login.toLowerCase();
    b = b.login.toLowerCase();

    if(b > a) return 1;
    if(b < a) return -1;
    return 0;
  }

  switch(mode){
    case '':
      return result;
    case 'AZ':
      return result.sort(sortAZ);
    case 'ZA':
      return result.sort(sortZA);
  }
}

export default class detailContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      reactWatchers: [],
      eTag: '',
      lastUpdated: '',
      filterUser: '',
      notification: '',
      sortMode: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
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
        notification: 'new watchers!',
      },
        ()=>console.log('new state:',this.state));
    })
    .catch(error => {
      /*
      console.error('handleClick error:',error)
      console.log(typeof error,Object.keys(error));
      console.log(error.response,Object.keys(error.response));
      */
      if(error.response.status === 304){
        this.setState({notification: Date() + ": no new updates"});
      }
      else {
        console.error('handleClick error:',error)
      }
    });
  }

  toggleSort(event){
    event.preventDefault();
    console.log('target: ',event.target.name);
    if(this.state.sortMode === event.target.name){
      this.setState({sortMode: ''});
    }
    else {
      this.setState({sortMode: event.target.name});
    }
  }

  searchUser(event){
    event.preventDefault();
    this.setState({searchUser: event.target.value});
  }

  render(){
    let filteredUsers = this.state.reactWatchers.filter(user => 
      user.login.match(this.state.searchUser)
    );
    let sortedUsers = sortUsers(filteredUsers,this.state.sortMode);

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Last updated:</th>
              <td>{this.state.lastUpdated}</td>
            </tr>
            <tr>
              <th>Notification: </th>
              <td>{this.state.notification}</td>
            </tr>
          </tbody>
        </table>
        <h3>Watchers</h3>
        <FilterUser
          searchUser={this.searchUser}
          toggleSort={this.toggleSort}
          sortMode={this.state.sortMode}
        />
        {sortedUsers.map(user =>
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
  const toggleSort = props.toggleSort;
  const sortMode = props.sortMode;

  return (
    <div>
      <form className="form-group">
        <input
          className="form-control"
          type="text"
          name="users"
          onChange={searchUser}
          placeholder="search user"
        />
        <input
          className={sortMode === 'AZ' ? "btn btn-default active" :
            "btn btn-default"}
          type="button"
          name="AZ"
          value="A-Z"
          onClick={toggleSort}
        />
        <input
          className={sortMode === 'ZA' ? "btn btn-default active" :
            "btn btn-default"}
          type="button"
          name="ZA"
          value="Z-A"
          onClick={toggleSort}
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








