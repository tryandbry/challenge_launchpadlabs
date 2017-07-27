# challenge_launchpadlabs
## Overview
This project creates a dashboard for comparing GitHub activity on several repos:
* facebook/react
* angular/angular.js
* emberjs/ember.js
* vuejs/vue

See the project live: [https://launchpad-labs-bryan-kao.herokuapp.com/](https://launchpad-labs-bryan-kao.herokuapp.com/)

### "general" table
Data is populated from GET requests to `https://api.github.com/repos/:owner/:repo`

The endpoint is polled periodically (every 29 sec) for updates.  To insure the API limit is not hit prematurely, etags are recorded after the first pass and included in subsequent requests.

### "commit" table
Data is populated from GET requests to `https://api.github.com/repos/:owner/:repo/commits`

Note that the response is paginated.  To insure a correct count, the pagination is requested as one (1) datapoint per page via the param: `per_page=1`.  The count is derived from the `headers.link` property of the response.

The endpoint is polled every 37 sec (so as to not overlap with polling on the "general" endpoint).  The initial request pulls several datapoints:
* commits since the previous day
* commits since last week
* commits since last month

Subsequent calls only request the previous day.  The delta (if any) is recorded, and all counters are updated accordingly.  Etags are recorded to insure that only updates are acted upon.

## Usage

command | description
------- | -----------
`npm start` | starts the app
`npm run build` | rebuilds webpack bundle
`npm test` | executes unit tests in /test

## Misc
### Design challenges
1. **DetailContainer**<br/>`DetailContainer` was the first attempt (accessed via the "Watchers" link on the Navbar).  After building the component, it was apparant that it was not that useful for comparing repositories.  It is included as an artifact.
2. **GitHub API request limits**<br/>GitHub offers non-authenticated users up to 60 requests / hour.  Given the number of calls required to populate the desired stats, it was a challenging to develop and test.  Given more time, OAuth could be implemented to increase the request limit.
3. **Transitioning to Redux**<br/>After some prototyping, it was clear that Redux was needed.  Local state was getting very messy.
