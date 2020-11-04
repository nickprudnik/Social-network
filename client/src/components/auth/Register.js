import React from 'react';
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { ErrorMessage } from '@hookform/error-message';
import './auth.css';

import { signUp } from '../../actions/auth';


function RegisterForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(signUp(data, props.history))
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <label className="label-form">Name</label>
      <input className="input-form" name="name" defaultValue={props.name} ref={register({
        required: "Name is required.",
        pattern: {
            value: /^[A-Za-z]+$/,
            message: "Letters only."
        },
        minLength: {
          value: 2,
          message: "Name exceed min length."
        }
      })} />
      <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <p className="input-error">{message}</p>}
      />

      <label className="label-form">Login</label>
      <input className="input-form" name="email" defaultValue={props.email} ref={register({
          required: "Email is required.",
          pattern: {
            value: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
            message: "This еmail is not valid."
          },
          minLength: {
            value: 4,
            message: "Email exceed min length."
          }
      })} />
      <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className="input-error">{message}</p>}
      />
      
      <label className="label-form">Password</label>
      <input className="input-form" cc-csc="true" name="password" type="password" defaultValue={props.password} ref={register({
          required: "Password is required.",
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: "This password is not valid."
          },
          minLength: {
            value: 4,
            message: "Password exceed min lenth."
          }
      })} />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p className="input-error">{message}</p>}
      />
      
      <input className="submit-form" type="submit" />
    </form>
  );
}

const Register = connect()(RegisterForm);
export default Register;