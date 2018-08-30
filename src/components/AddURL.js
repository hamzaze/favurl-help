import React, { Component } from 'react';
import Form from './Form';
import TopMenu from './TopMenu';


class AddURL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showButton: false
    }
    this.hideButton = this.hideButton.bind(this);
  }

  hideButton(){
    this.setState({
      showButton: false
    });
  }

  addNewURL = (urlInfo) => {
    this.setState({
      showButton: true
    });
    var list = JSON.parse(localStorage.getItem("list"));
    if(list === null) {
      list = this.state.list;
    }

    list.length > 0 ? list.unshift(urlInfo) : list.push(urlInfo);

    this.setState({
      list
    }, () => { 
      localStorage.setItem("list", JSON.stringify(list));
      localStorage.setItem("newItem", "");
    }
  );
  }

  render() {
    return (
      <div>
      <TopMenu />
      <div className="container paddTop20">
        <div className="row">
          <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3">
            <h2 className="text-center paddTopBottom20 text-darkgray">Add URL</h2>
            <Form onSubmit={this.addNewURL} showButton={this.state.showButton} hideButton={this.hideButton} />
          </div>
        </div>
      </div>
      </div>
    )
  }
}


export default AddURL;