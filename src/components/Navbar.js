import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="d-flex flex-row-reverse">
        <div className="p-2"><a className="btn btn-warning btn-sm" href="/broken-urls">Broken URLs</a></div>
        <div className="p-2"><a className="btn btn-primary btn-sm" href="/add-url">Add URL</a></div>
      </div>
    )
  }
}

export default withRouter(Navbar);