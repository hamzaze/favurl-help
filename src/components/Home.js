import React, { Component } from 'react';
import Navbar from './Navbar';
import ItemList from './ItemList';
import AddURL from './AddURL';
import BrokenURLs from './BrokenURLs';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      showModal1: false,
      newItem: {},
      newList: []
    };
    this.toggleAddURL = this.toggleAddURL.bind(this);
    this.toggleBrokenLinks = this.toggleBrokenLinks.bind(this);
    this.addNewURL = this.addNewURL.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  toggleAddURL() {
    this.setState({ showModal: !this.state.showModal });
  }

  toggleBrokenLinks() {
    this.setState({ showModal1: !this.state.showModal1 });
  }

  addNewURL(newItem) {
    this.setState({newItem});
  }

  updateList(newList) {
    this.setState({newList});
  }

  render() {
    return (
      <div className="container paddTop20">
        <Navbar toggleAddURL={this.toggleAddURL} toggleBrokenLinks={this.toggleBrokenLinks} />
        <AddURL showModal={this.state.showModal} handleToggleModal={this.toggleAddURL} addNewURL={this.addNewURL} />
        <BrokenURLs showModal={this.state.showModal1} handleToggleModal={this.toggleBrokenLinks} updateList={this.updateList} />
        <ItemList newItem={this.state.newItem} newList={this.state.newList} updateList={this.updateList} />
      </div>
    )
  }
}

export default Home;