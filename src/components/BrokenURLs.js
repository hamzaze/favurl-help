import React, { Component } from 'react';
import ItemList from './ItemList';
import { Modal, Button } from 'react-bootstrap';
const linkCheck = require('link-check');
var asyncFilter = require('array-async-filter');


class BrokenURLs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      sortBy: 'asc',
      btnClassName: 'btn btn-primary btn-sm',
      disabled: false,
      visible: 'd-none',
      hideList: true,
      showModal: false
    };

    this.findBrokenLinks = this.findBrokenLinks.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  findBrokenLinks() {
    //Really disable on click for disabled button
    if(this.state.disabled) {
      return;
    }
    this.disableButton();
    let brokenList = [];
    var list = JSON.parse(localStorage.getItem("list"));

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
          list: brokenList,
          hideList: !self.state.hideList
        }, () => {
          self.enableButton();
      });
      }
    );
  }

disableButton() {
  this.setState({
    btnClassName: 'btn btn-secondary btn-sm disabled',
    disabled: true,
    list: [],
    visible: ''
  });
}

enableButton() {
  this.setState({
    btnClassName: 'btn btn-primary btn-sm',
    disabled: false,
    visible: 'd-none'
  });
}

updateList(list) {
  this.props.updateList(list);
}

  render() {
    const { props } = this;
    return (
       <div>
        <Modal show={props.showModal} onHide={props.handleToggleModal} bsSize="large">
          <Modal.Header>
            <Button className="close" onClick={props.handleToggleModal}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </Button>
            <Modal.Title>Broken URLs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="text-center paddTopBotom10">
            <button type="button" 
                className={this.state.btnClassName}
                onClick={this.findBrokenLinks}
                >Find Broken URLs</button>
            </div>
            <ItemList hideList={this.state.hideList} list={this.state.list} updateList={this.updateList}/>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default BrokenURLs;