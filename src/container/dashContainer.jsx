import React from 'react';
import dash from '../api/dash';

export default class detailContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      react: {},
    };

    /*
    this.handleClick = this.handleClick.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    */
  }

  componentDidMount(){
    let reactAPI = dash('facebook','react');
    reactAPI()
    .then(res => {
      console.log('gitHub API response:',res);
      this.setState({
        react: {
          stars: res.data.stargazers_count,
          watchers: res.data.watchers_count,
          forks: res.data.forks_count,
          issues: res.data.open_issues_count,
        },
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








