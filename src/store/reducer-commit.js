import axios from 'axios';

//VERBS
const SET_DAY1 = 'SET_DAY1';
const SET_DAY7 = 'SET_DAY7';
const SET_DAY30 = 'SET_DAY30';
const INCREMENT_COUNT = 'INCREMENT_COUNT';
const SET_UPDATE_TIME = 'SET_UPDATE_TIME';
const SET_POLL_TIME = 'SET_POLL_TIME';
const SET_ETAG1 = 'SET_ETAG1';
const SET_ETAG7 = 'SET_ETAG7';
const SET_ETAG30 = 'SET_ETAG30';
//VERBS - END

const INIT = {
  lastUpdate: '',
  lastPoll: '',
  day1: -1,
  day7: -1,
  day30: -1,
  etag1: '',
  etag7: '',
  etag30: '',
};

const commit = (state=INIT,action) => {
  let newState = Object.assign({},state);

  switch(action.type) {
    case SET_UPDATE_TIME:
      newState.lastUpdate = action.time;
      newState.lastPoll = action.time;
      break; 
    case SET_POLL_TIME:
      newState.lastPoll = action.time;
      break; 
    case SET_DAY1:
      newState.day1 = action.count;
      break;
    case SET_DAY7:
      newState.day7 = action.count;
      break;
    case SET_DAY30:
      newState.day30 = action.count;
      break;
    case INCREMENT_COUNT:
      //calculate delta
      let delta = action.count - state.day1;
      //set new counts
      newState.day1 = action.count;
      newState.day7 += delta;
      newState.day30 += delta;
      break;
    case SET_ETAG1:
      newState.etag1 = action.etag;
      break;
    case SET_ETAG7:
      newState.etag7 = action.etag;
      break;
    case SET_ETAG30:
      newState.etag30 = action.etag;
      break;
    default:
      return state;
  }
  return newState;
}

export default commit;

//ACTION CREATORS
const actionSetUpdateTime = (time) => ({
  type: SET_UPDATE_TIME,
  time
})

const actionSetPollTime = (time) => ({
  type: SET_POLL_TIME,
  time
})

const actionSetDay1 = (count) => ({
  type: SET_DAY1,
  count
})

const actionSetDay7 = (count) => ({
  type: SET_DAY7,
  count
})

const actionSetDay30 = (count) => ({
  type: SET_DAY30,
  count
})

const actionSetEtag1 = (etag) => ({
  type: SET_ETAG1,
  etag
})

const actionSetEtag7 = (etag) => ({
  type: SET_ETAG1,
  etag
})

const actionSetEtag30 = (etag) => ({
  type: SET_ETAG1,
  etag
})

//ACTION CREATORS - END

//DISPATCHERS
export const fetchDay1 = () => {
  return dispatch => {
  }
}
//DISPATCHERS - END
