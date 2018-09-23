import React, { Component } from 'react';
import Form from './Form';
import { Modal, Button } from 'react-bootstrap';


class AddURL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showButton: false,
      showModal: false
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
    this.props.addNewURL(urlInfo);
  }

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem("list"));
    this.setState( {
      list
    });
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
            <Modal.Title>Add URL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addNewURL} showButton={this.state.showButton} hideButton={this.hideButton} />
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}


export default AddURL;