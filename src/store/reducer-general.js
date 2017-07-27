import axios from 'axios';

//VERBS
const GENERAL_SET_STATS = 'GENERAL_SET_STATS';
const GENERAL_SET_UPDATE_TIME = 'GENERAL_SET_UPDATE_TIME';
const GENERAL_SET_POLL_TIME = 'GENERAL_SET_POLL_TIME';
const GENERAL_SET_ETAG = 'GENERAL_SET_ETAG';
//VERBS - END

//CONSTANTS
const BASE_URL = 'https://api.github.com/repos';
//CONSTANTS - END

const template = {
  lastUpdate: '',
  lastPoll: '',
  stars: -1,
  watchers: -1,
  forks: -1,
  issues: -1,
  etag: '',
};

const INIT = {
  react: Object.assign({},template),
  angular: Object.assign({},template),
  ember: Object.assign({},template),
  vue: Object.assign({},template),
};

const general = (state=INIT,action) => {
  let newState = Object.assign({},state);

  switch(action.type) {
    case GENERAL_SET_UPDATE_TIME:
      newState[action.name].lastUpdate = action.time;
      newState[action.name].lastPoll = action.time;
      break; 
    case GENERAL_SET_POLL_TIME:
      newState[action.name].lastPoll = action.time;
      break; 
    case GENERAL_SET_STATS:
      newState[action.name].stars = action.stars;
      newState[action.name].watchers = action.watchers;
      newState[action.name].forks = action.forks;
      newState[action.name].issues = action.issues;
      break;
    case GENERAL_SET_ETAG:
      newState[action.name].etag = action.etag;
      break;
    default:
      return state;
  }
  return newState;
}

export default general;

//ACTION CREATORS
const actionSetUpdateTime = (name,time) => ({
  type: GENERAL_SET_UPDATE_TIME,
  name,
  time,
})

const actionSetPollTime = (name,time) => ({
  type: GENERAL_SET_POLL_TIME,
  name,
  time
})

const actionSetStats = (name,stars,watchers,forks,issues) => ({
  type: GENERAL_SET_STATS,
  name,
  stars,
  watchers,
  forks,
  issues,
})

const actionSetEtag = (name,etag) => ({
  type: GENERAL_SET_ETAG,
  name,
  etag,
})

//ACTION CREATORS - END

//DISPATCHERS
export const fetchStats = (name,etag='') => {
  if(invalidRepoName(name)) return null;

  return dispatch => {
    let call = createCall(etag);
    let url = constructUrl(name); 
      
    return call.get(url)
    .then(res => {
      console.log('gitHub API response:',res);

      dispatch(actionSetStats(
        name,
        res.data.stargazers_count,
        res.data.watchers_count,
        res.data.forks_count,
        res.data.open_issues_count
      ));
      dispatch(actionSetEtag(name,res.headers.etag));
      dispatch(actionSetUpdateTime(name,getTime()));

      return 0;
    })
    .catch(error => {
      // update time if no changes since last poll
      if(error.response.status === 304){
        dispatch(actionSetPollTime(name,getTime()));
        console.log(`no general stat changes for ${name}`);
      }
      else {
        console.error('fetchCommitCount:',error);
      }
    });
  }
}
//DISPATCHERS - END

//VALIDATORS
const invalidRepoName = (name) => {
  if(!name.match(/(^react$)|(^angular$)|(^ember$)|(^vue$)/)){
    console.error('fetchCommitCount ERROR: name must equal ' +
                'react | angular | ember | vue');
    return true;
  }
  return false;
}

//VALIDATORS - END


//UTILS
const constructUrl = (name) => {
  switch(name){
    case 'react':
      return `${BASE_URL}/facebook/react`;
    case 'angular':
      return `${BASE_URL}/angular/angular.js`;
    case 'ember':
      return `${BASE_URL}/emberjs/ember.js`;
    case 'vue':
      return `${BASE_URL}/vuejs/vue`;
  }
}

const createCall = (etag) => {
  let config = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  };
  
  //tack on etag, if valid:
  if(etag != ''){
    config.headers['If-None-Match']=`${etag}`;
  }

  return axios.create(config);
}

const getTime = () => {
  let date = new Date();
  return date.toTimeString().slice(0,17);
}

//UTILS - END
