import axios from 'axios';

//const URL = 'https://api.github.com/repos/jmregan0/Smart_Docs/stargazers';
const URL = 'https://api.github.com/repos/facebook/react/stargazers';

let config = {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    //'If-None-Match': '"ced4b2a110e42041bddff6b9ce6a7355"',
  },
};

let git = axios.create(config);

export default (eTag) => {
  //console.log('watcher props:',eTag);
  if(eTag != '' && config.headers['If-None-Match'] != eTag){
    config.headers['If-None-Match']=`${eTag}`;
    //console.log('watcher set new header: ',config);
    git = axios.create(config);
  }

  return git.get(URL);
}
