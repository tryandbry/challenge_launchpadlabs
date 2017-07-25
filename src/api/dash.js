import axios from 'axios';

const URL = 'https://api.github.com/repos';

let config = {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
};

let git = axios.create(config);

export default (author,repo) => {
  return (eTag) => {
    //console.log('watcher props:',eTag);
    if(eTag != '' && config.headers['If-None-Match'] != eTag){
      config.headers['If-None-Match']=`${eTag}`;
      //console.log('watcher set new header: ',config);
      git = axios.create(config);
    }

    return git.get(`${URL}/${author}/${repo}`);
  }
}

const updateStats = (component,apiCall,path) => {
  apiCall(component.state[path].eTag)
  .then(res => {
    console.log('gitHub API response:',res);
    component.setState({
      [path]: {
        stars: res.data.stargazers_count,
        watchers: res.data.watchers_count,
        forks: res.data.forks_count,
        issues: res.data.open_issues_count,
        eTag: res.headers.etag,
      },
    },
      ()=>console.log('new state:',component.state));
  })
  .catch(error => {
    if(error.response.status === 304){
      component.setState({
        notification: path.toUpperCase() + ': ' + Date() + ": no new updates"
      });
    }
    else {
      console.error('updateStats error:',error)
    }
  });
}

export {updateStats};
