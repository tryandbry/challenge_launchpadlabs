import axios from 'axios';

//VERBS
const COMMIT_SET_DAY1 = 'COMMIT_SET_DAY1';
const COMMIT_SET_DAY7 = 'COMMIT_SET_DAY7';
const COMMIT_SET_DAY30 = 'COMMIT_SET_DAY30';
const COMMIT_INCREMENT_COUNT = 'COMMIT_INCREMENT_COUNT';
const COMMIT_SET_UPDATE_TIME = 'COMMIT_SET_UPDATE_TIME';
const COMMIT_SET_POLL_TIME = 'COMMIT_SET_POLL_TIME';
const COMMIT_SET_ETAG1 = 'COMMIT_SET_ETAG1';
const COMMIT_SET_ETAG7 = 'COMMIT_SET_ETAG7';
const COMMIT_SET_ETAG30 = 'COMMIT_SET_ETAG30';
//VERBS - END

//CONSTANTS
const BASE_URL = 'https://api.github.com/repos';
//CONSTANTS - END

const template = {
  lastUpdate: '',
  lastPoll: '',
  day1: -1,
  day7: -1,
  day30: -1,
  etag1: '',
  etag7: '',
  etag30: '',
};

const INIT = {
  react: Object.assign({},template),
  angular: Object.assign({},template),
  ember: Object.assign({},template),
  vue: Object.assign({},template),
};

const commit = (state=INIT,action) => {
  let newState = Object.assign({},state);

  switch(action.type) {
    case COMMIT_SET_UPDATE_TIME:
      newState[action.name].lastUpdate = action.time;
      newState[action.name].lastPoll = action.time;
      break; 
    case COMMIT_SET_POLL_TIME:
      newState[action.name].lastPoll = action.time;
      break; 
    case COMMIT_SET_DAY1:
      newState[action.name].day1 = action.count;
      break;
    case COMMIT_SET_DAY7:
      newState[action.name].day7 = action.count;
      break;
    case COMMIT_SET_DAY30:
      newState[action.name].day30 = action.count;
      break;
    case COMMIT_INCREMENT_COUNT:
      //calculate delta
      let delta = action.count - state[action.name].day1;
      //set new counts
      newState[action.name].day1 = action.count;
      newState[action.name].day7 += delta;
      newState[action.name].day30 += delta;
      break;
    case COMMIT_SET_ETAG1:
      newState[action.name].etag1 = action.etag;
      break;
    case COMMIT_SET_ETAG7:
      newState[action.name].etag7 = action.etag;
      break;
    case COMMIT_SET_ETAG30:
      newState[action.name].etag30 = action.etag;
      break;
    default:
      return state;
  }
  return newState;
}

export default commit;

//ACTION CREATORS
const actionSetUpdateTime = (name,time) => ({
  type: COMMIT_SET_UPDATE_TIME,
  name,
  time,
})

const actionSetPollTime = (name,time) => ({
  type: COMMIT_SET_POLL_TIME,
  name,
  time
})

const actionSetCount = (name,day,count) => {
  let obj = {
    name,
    count,
  };
  switch(day){
    case 1:
      obj.type = COMMIT_SET_DAY1;
      break;
    case 7:
      obj.type = COMMIT_SET_DAY7;
      break;
    case 30:
      obj.type = COMMIT_SET_DAY30;
      break;
    default:
      throw 'actionSetCommit: unknown day encountered';
  }
  return obj;
}

const actionSetEtag = (name,day,etag) => {
  let obj = {
    name,
    etag,
  };
  switch(day){
    case 1:
      obj.type = COMMIT_SET_ETAG1;
      break;
    case 7:
      obj.type = COMMIT_SET_ETAG7;
      break;
    case 30:
      obj.type = COMMIT_SET_ETAG30;
      break;
    default:
      throw 'actionSetEtag: unknown day encountered';
  }
  return obj;
}

const actionIncrementCount = (name,count) => ({
  type: COMMIT_INCREMENT_COUNT,
  name,
  count,
})

//ACTION CREATORS - END

//DISPATCHERS
export const fetchCommitCount = (name,day,etag='',increment=false) => {
  if(invalidRepoName(name) || invalidDay(day)) return null;

  return dispatch => {
    let call = createCall(etag);
    let url = increment ? 
      constructUrl(name,1,'commits') : 
      constructUrl(name,day,'commits'); 
      
    return call.get(url)
    .then(res => {
      console.log('gitHub API response:',res);

      let count = countCommits(res);

      increment ? 
        dispatch(actionIncrementCount(name,count)) :
        dispatch(actionSetCount(name,day,count));
      dispatch(actionSetEtag(name,day,res.headers.etag));
      dispatch(actionSetUpdateTime(name,getTime()));

      return 0;
    })
    .catch(error => {
      // update time if no changes since last poll
      if(error.response.status === 304){
        dispatch(actionSetPollTime(name,getTime()));

        increment ? 
          console.log(`no incremental changes for ${name}`) : 
          console.log(`no changes for ${name} day${day}`);
      }
      else {
        console.error('fetchCommitCount:',error);
      }
    });
  }
}
//DISPATCHERS - END

//VALIDATORS
const invalidDay = (day) => {
  if(!String(day).match(/(^1$)|(^7$)|(^30$)/)){
    console.error('validatateDay: day must equal 1 | 7 | 30');
    return true;
  }
  return false;
}

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
const printNum = (n,offset) => {
  let num = parseInt(n)+offset;
  return num < 10 ? `0${num}` : String(num);
}

const parsePageHeader = (linkStr) => {
  let arr = linkStr.split(';');
  return +arr[1].match(/&page=[0-9]+/)[0].slice(6);
}

const getDate = (day) => {
  let a = new Date();
  a.setDate(a.getDate()-day);

  return (
    a.getFullYear() + '-' +
    printNum(a.getMonth(),1) + '-' +
    printNum(a.getDate(),0)
  );
}

const constructUrl = (name,day,path) => {
  let url = '';

  switch(name){
    case 'react':
      url = `${BASE_URL}/facebook/react/`;
      break;
    case 'angular':
      url = `${BASE_URL}/angular/angular.js/`;
      break;
    case 'ember':
      url = `${BASE_URL}/emberjs/ember.js/`;
      break;
    case 'vue':
      url = `${BASE_URL}/vuejs/vue/`;
      break;
  }

  url += `${path}?since=${getDate(day)}&per_page=1`;

  return url;
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

const countCommits = (res) => {
  let commitCount =
    res.headers.link ?
      parsePageHeader(res.headers.link) :
      res.data.length;
  console.log(`countCommits: detected ${commitCount} commits`);

  return commitCount;
}

const getTime = () => {
  let date = new Date();
  return date.toTimeString().slice(0,17);
}

//UTILS - END
