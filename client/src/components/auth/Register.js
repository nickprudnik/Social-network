import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormErrorsEmail, FormErrorsPassword, FormErrorsName } from "./FormErrors";

import { register } from '../../actions/auth';

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      formErrors: {email: ''},
      formErrorsPassword: { password: ''},
      formErrorsName: { name: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordFieldValidation = this.state.formErrorsPassword;
    let nameFieldValidation = this.state.formErrorsName;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let namedValid = this.state.namedValid;
  switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        passwordFieldValidation.password = passwordValid ? '': 'Password is too short';
        break;
      case 'name':
        namedValid = value.length >= 3;
        nameFieldValidation.name = namedValid ? '': 'Name is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    formErrorsPassword: passwordFieldValidation,
                    formErrorsName: nameFieldValidation,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    namedValid: namedValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.namedValid});
  }
  
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.register(this.state, this.props.history)
  }

  render() {
    return (
      <div className="row mt-4 custom-container">
        <div className="col-md-6 col-md-offset-3">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Registration</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className={`form-control ${this.errorClass(this.state.formErrorsName.name)}`}
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                <FormErrorsName formErrorsName={this.state.formErrorsName} />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      className={`form-control ${this.errorClass(this.state.formErrors.email)}`}
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <FormErrorsEmail formErrors={this.state.formErrors} />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      className={`form-control ${this.errorClass(this.state.formErrorsPassword.password)}`}
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <FormErrorsPassword formErrorsPassword={this.state.formErrorsPassword} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-dark btn-block">Register</button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { register })(Register)
