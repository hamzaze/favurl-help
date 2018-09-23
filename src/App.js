import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={ Home } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
