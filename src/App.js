import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import AddURL from './components/AddURL';
import BrokenURLs from './components/BrokenURLs';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={ Home } />
            <Route exact path="/add-url" component={ AddURL } />
            <Route exact path="/broken-urls" component={ BrokenURLs } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
