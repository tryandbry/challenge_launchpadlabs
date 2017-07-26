import axios from 'axios';

//VERBS
const TOGGLE_GENERAL = 'TOGGLE_GENERAL';
const TOGGLE_COMMIT = 'TOGGLE_COMMIT';
const RESET = 'RESET';
//VERBS - END

const INIT = {
  general: true,
  commit: true,
};

const control = (state=INIT,action) => {
  let newState = Object.assign({},state);

  switch(action.type) {
    case TOGGLE_GENERAL:
      newState.general = !newState.general;
      break; 
    case TOGGLE_COMMIT:
      newState.commit = !newState.commit;
      break; 
    case RESET:
      newState.general = true;
      newState.commit = true;
      break;
    default:
      return state;
  }
  return newState;
}

export default control;

//ACTION CREATORS
const actionToggleGeneral = () => ({
  type: TOGGLE_GENERAL,
})

const actionToggleCommit = () => ({
  type: TOGGLE_COMMIT,
})

const actionReset = () => ({
  type: RESET,
})

//ACTION CREATORS - END

//DISPATCHERS
export const toggleGeneral = () => {
  return dispatch => dispatch(actionToggleGeneral());
}

export const toggleCommit = () => {
  return dispatch => dispatch(actionToggleCommit());
}

export const toggleReset = () => {
  return dispatch => dispatch(actionReset());
}

//DISPATCHERS - END
