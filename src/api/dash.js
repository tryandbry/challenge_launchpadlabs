import axios from 'axios';

//const URL = 'https://api.github.com/repos/facebook/react/';
const URL = 'https://api.github.com/repos';

let config = {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    //'If-None-Match': '"ced4b2a110e42041bddff6b9ce6a7355"',
  },
};

let git = axios.create(config);

/*
export default (eTag) => {
  //console.log('watcher props:',eTag);
  if(eTag != '' && config.headers['If-None-Match'] != eTag){
    config.headers['If-None-Match']=`${eTag}`;
    //console.log('watcher set new header: ',config);
    git = axios.create(config);
  }

  //return git.get(URL);
  return (author,repo) => {
    return git.get(`${URL}author/repo/`);
  }
}
*/

export default (author,repo) => {
  return (eTag) => {
    //console.log('watcher props:',eTag);
    if(eTag != '' && config.headers['If-None-Match'] != eTag){
      config.headers['If-None-Match']=`${eTag}`;
      //console.log('watcher set new header: ',config);
      git = axios.create(config);
    }

    return git.get(`${URL}/${author}/${repo}/`);
  }
}
