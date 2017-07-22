const axios = require('axios');

/* URLs
const URL = 'https://api.github.com/repos/facebook/react/subscribers';
*/
const URL = 'https://api.github.com/repos/facebook/react/subscribers';
//const URL = 'https://api.github.com/orgs/octokit/repos';

const git = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

git.get(URL)
.then(res => console.log(res))
.catch(error => console.error('error encountered: ',error));
