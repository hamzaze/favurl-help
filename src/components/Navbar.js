import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const { props } = this;
    return (
      <div className="d-flex flex-row-reverse">
        <div className="p-2"><button className="btn btn-warning btn-sm" onClick={() => props.toggleBrokenLinks()}>Broken URLs</button></div>
        <div className="p-2"><button className="btn btn-primary btn-sm" onClick={() => props.toggleAddURL()}>Add URL</button></div>
      </div>
    )
  }
}

export default withRouter(Navbar);