import React from "react";
import "./index.css"

export const FormErrorsEmail = ({formErrors}) =>
  <div className='formErrors validation-error'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
  
export const FormErrorsPassword = ({formErrorsPassword}) =>
  <div className='formErrorsPassword validation-error'>
    {Object.keys(formErrorsPassword).map((fieldName, i) => {
      if(formErrorsPassword[fieldName].length > 0){
        return (
          <p key={i}>{formErrorsPassword[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>

export const FormErrorsName = ({formErrorsName}) =>
<div className='formErrorsName validation-error'>
  {Object.keys(formErrorsName).map((fieldName, i) => {
    if(formErrorsName[fieldName].length > 0){
      return (
        <p key={i}>{formErrorsName[fieldName]}</p>
      )        
    } else {
      return '';
    }
  })}
</div>