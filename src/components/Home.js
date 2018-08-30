import React, { Component } from 'react';
import Navbar from './Navbar';
import ItemList from './ItemList';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount() {
      const list = JSON.parse(localStorage.getItem("list"));
      this.setState( {
        list: list
      });
  }

  render() {
    return (
      <div className="container paddTop20">
        <Navbar />
        <ItemList showListOnLoad={true} list={this.state.list} />
      </div>
    )
  }
}

export default Home;