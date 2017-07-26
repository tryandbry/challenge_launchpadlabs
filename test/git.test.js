const axios = require('axios');

/* URLs
const URL = 'https://api.github.com/repos/facebook/react/subscribers';
*/
//const URL = 'https://api.github.com/repos/facebook/react/subscribers';
//const URL = 'https://api.github.com/repos/facebook/react/commits?since=2017-07-24&per_page=1';
//const URL = 'https://api.github.com/repos/facebook/react/commits';
//const URL = 'https://api.github.com/repos/jmregan0/Smart_Docs/stargazers';
const URL = 'https://api.github.com/repos/facebook/react';
//const URL = 'https://api.github.com/users/tryandbry';
//const URL = 'https://api.github.com/orgs/octokit/repos';

const git = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    //'If-None-Match': '"e7b500dfffd8553a54163a90acb1d9fd"',
    'If-None-Match': '"ced4b2a110e42041bddff6b9ce6a7355"',
  }
});

git.get(URL)
//.then(res => res.data)
.then(res => console.log(res))
.catch(error => console.error('error encountered: ',error));
