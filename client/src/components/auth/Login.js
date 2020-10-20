import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormErrorsEmail, FormErrorsPassword } from "./FormErrors";

import { login } from '../../actions/auth';

class Login extends React.Component {
  
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      formErrors: {email: ''},
      formErrorsPassword: { password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        passwordFieldValidation.password = passwordValid ? '': 'Password is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    formErrorsPassword: passwordFieldValidation,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid &&
                              this.state.passwordValid});
  }
  
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state)
  }

  render() {
    return (
      <div className="row mt-4 custom-container">
        <div className="col-md-6 col-md-offset-3">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
              <form onSubmit={this.onSubmit}>
                <div className="panel panel-default">
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input type="email" required 
                        className={`form-control ${this.errorClass(this.state.formErrors.email)}`} 
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange}  />
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
                      required
                    />
                  </div>
                  <FormErrorsPassword formErrorsPassword={this.state.formErrorsPassword} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-dark btn-block" disabled={!this.state.formValid}>Login</button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { login })(Login)
