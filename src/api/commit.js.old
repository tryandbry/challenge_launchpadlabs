import axios from 'axios';

const URL = 'https://api.github.com/repos';

let config = {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
};

let git = axios.create(config);

export default (author,repo) => {
  return (eTag,since) => {
    console.log('reactCommitAPI props:',eTag,since);
    if(eTag != '' && config.headers['If-None-Match'] != eTag){
      config.headers['If-None-Match']=`${eTag}`;
      //console.log('watcher set new header: ',config);
      git = axios.create(config);
    }

    return since ? 
      git.get(`${URL}/${author}/${repo}/commits?since=${since}&per_page=1`) : 
      git.get(`${URL}/${author}/${repo}/commits?per_page=1`);
  }
}

const updateCommitStats = (component,apiCall,path) => {
  apiCall(
    component.state[path].eTag1,
    getPreviousDate(1)
  )
  .then(res => {
    console.log('gitHub API response:',res);
    
    // if link property exists, then count pages on "last" link
    // else, use the length of the data array
    let commitCount = 
      res.headers.link ?
        parsePageHeader(res.headers.link) :
        res.data.length;
    console.log('updateCommitStats,commitCount: ',commitCount);

    component.setState({
      [path]: {
        day: commitCount,
        eTag1: res.headers.etag,
      },
    },
      ()=>console.log('new state:',component.state));
  })
  .catch(error => {
    if(error.response.status === 304){
      console.log('received 304: no new updates');
    }
    else {
      console.error('updateStats error:',error)
    }
  });
}

export {updateCommitStats};

const getPreviousDate = (days) => {
  let a = new Date();
  a.setDate(a.getDate()-days);
  
  return (
    a.getFullYear() + '-' +
    printNum(a.getMonth(),1) + '-' +
    printNum(a.getDate(),0)
  ); 
}

const printNum = (n,offset) => {
  let num = parseInt(n)+offset;
  return num < 10 ? `0${num}` : String(num);
}

const parsePageHeader = (linkStr) => {
  let arr = linkStr.split(';');
  return +arr[1].match(/&page=[0-9]+/)[0].slice(6);
}
