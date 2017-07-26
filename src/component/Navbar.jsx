import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {
  toggleGeneral,
  toggleCommit,
  toggleReset
} from '../store/reducer-control';

const Navbar = (props) => {
  const toggleGeneral = props.toggleGeneral;
  const toggleCommit = props.toggleCommit;
  const toggleReset = props.toggleReset;

  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button" 
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">Bryan Kao&#39;s LaunchPad Labs Challenge Project</Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
          </ul>
          <button
            className="btn btn-primary navbar-btn custom-btn-nav"
            onClick={toggleGeneral}
          >General</button>
          <button
            className="btn btn-primary navbar-btn custom-btn-nav"
            onClick={toggleCommit}
          >Commit</button>
          <button
            className="btn btn-warning navbar-btn custom-btn-nav"
            onClick={toggleReset}
          >Reset</button>
        </div>
      </div>
    </nav>
  );
}

const mapState = (state) => ({
  general: state.control.general,
  commit: state.control.commit
});

const mapDispatch = {
  toggleGeneral,
  toggleCommit,
  toggleReset,
}

export default connect(mapState,mapDispatch)(Navbar);
