import axios from 'axios';

const git = axios.create({
  /*
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Expose-Headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
    'Access-Control-Max-Age': 86400,
  }
  */
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

const URL = 'https://api.github.com/repos/jmregan0/Smart_Docs/stargazers';

export default () => git.get(URL)
