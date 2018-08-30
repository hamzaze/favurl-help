import React, { Component } from 'react';
import ItemList from './ItemList';
import TopMenu from './TopMenu';
const linkCheck = require('link-check');
var asyncFilter = require('array-async-filter');

class BrokenURLs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      sortBy: 'asc',
      btnClassName: 'btn btn-primary btn-block',
      disabled: false,
      visible: 'd-none',
      hideList: true
    };

    this.findBrokenLinks = this.findBrokenLinks.bind(this);
  }

  findBrokenLinks() {
    //Really disable on click for disabled button
    if(this.state.disabled) {
      return;
    }
    this.disableButton();
    let brokenList = [];
    const list = JSON.parse(localStorage.getItem("list"));

    var self = this;
    asyncFilter(
      list,
      function (item) {
        return new Promise(function (rs) {
         
          linkCheck(item.url, function (err, result) {
            if (err) {
              rs(true);
          }
            rs(result.status === 'dead');
          });
        });
      },
      function (err, res) {
        brokenList = res;
        self.setState({
          list: brokenList
        }, () => {
          self.enableButton();
      });
      }
    );
  }

disableButton() {
  this.setState({
    btnClassName: 'btn btn-secondary btn-block disabled',
    disabled: true,
    list: [],
    visible: ''
  });
}

enableButton() {
  this.setState({
    btnClassName: 'btn btn-primary btn-block',
    disabled: false,
    visible: 'd-none'
  });
}

  render() {
    var isVisible = this.state.visible;
    return (
      <div>
        <TopMenu />
        <div className="container paddTop20">
          <div className="row">
            <div className="col-lg-2 col-md-4 offset-lg-5 offset-md-4">
              <div className="form-group text-center text-center">
                <button type="button" 
                className={this.state.btnClassName}
                onClick={this.findBrokenLinks}
                >
                    Test
                </button>
                    
              </div>
            </div>
          </div>
          
          <div className={isVisible}>
              <div className="text-center text-small">
              Searching broken links from your favorite URL list might take some time and make the button disabled.<br />
                Please be patient while they're loading.
              </div>
            </div>
            <ItemList list={this.state.list} />
          
        </div>
      </div>
    )
  }
}

export default BrokenURLs;