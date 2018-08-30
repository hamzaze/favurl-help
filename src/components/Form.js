import React, { Component } from 'react';
import classnames from 'classnames';

class Form extends Component {

  static initialState = () => (
    {
      url: '',
      name: '',
      description: '',
      errors: {}
    }
  );
  state = Form.initialState();

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

	onSubmit = (e) => {
  	e.preventDefault();
      const url = {
        id: Math.floor(Date.now() / 1000),
        url: this.state.url,
        name: this.state.name,
        description: this.state.description,
        crdate: new Date()
    }
    this.props.onSubmit(url);
    this.resetForm();
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onClick(e) {
    e.preventDefault();
    this.props.hideButton();
  }

  resetForm () {
    this.setState(Form.initialState());
  }


  render() {
    const { errors } = this.state;
    const  props = this.props;
    return (
      <div>
        { props.showButton &&
          <div className="alert alert-success" role="alert">
            <button onClick={this.onClick} type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            
            <strong>Well done!</strong> Your URL is successfully submitted.
          </div>
        }
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="url"
                value={this.state.url}
                name="url"
                placeholder="Write a valid URL..."
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.url
                })}
                onChange={this.onChange}
                required="required"
                />
                {errors.url && (<div className="invalid-feedback">{errors.url}</div>)}
              </div>
              <div className="form-group">
                <input type="text"
                value={this.state.name}
                name="name"
                placeholder="Your URL's name..."
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                })}
                onChange={this.onChange}
                required="required"
                />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </div>
              <div className="form-group">
                <textarea
                value={this.state.description}
                name="description"
                className="form-control"
                placeholder="Add some description..."
                onChange={this.onChange}
                />
              </div>
              <div className="form-group text-center text-center">
                  <div className="row">
                      <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
                          <button type="submit" className="btn btn-primary btn-block">
                              Add URL
                          </button>
                      </div>
                  </div>
              </div>
            </form>
      </div>
    )
  }
}


export default Form;