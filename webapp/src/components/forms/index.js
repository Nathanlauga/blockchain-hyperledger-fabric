import React from 'react'
import classnames from 'classnames'
import Select from 'react-select'

export const renderField = ({
  input,
  label,
  type,
  placeholder,
  autoFocus,
  meta: { touched, error }
}) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      {label &&
        <label>{label}</label>
      }
      <input autoFocus={autoFocus} className="form-control" {...input} type={type} placeholder={placeholder} />
      {touched && error && <span className="help-block">{error}</span>}
    </div>
  )
}


export const checkBoxField = ({
  input,
  label,
  id
}) => {
  return (
    <div className="form-check">
      <input id={id} className="form-check-input" {...input} type="checkbox" />
      <label htmlFor={id} className="form-check-label">{label}</label>
    </div>
  )
}

export const switchBoxField = ({
  input,
  label,
  id,
  defaultChecked
}) => {
  return (
    <span className="switch">
      <input type="checkbox" {...input} className="switch" id={id} defaultChecked={defaultChecked} />
      <label htmlFor={id}>{label}</label>
    </span>
  )
}

export const SelectField = (props) => {
  return (
    <div className={classnames("form-group", { "has-error": props.error })}>
      <Select
        {...props}
        name={props.name}
        isSearchable={props.isSearchable}
        value={props.input.value}
        onChange={(value) => props.input.onChange(value)}
        options={props.options}
        removeSelected={true}
        closeOnSelect={props.closeOnSelect}
        multi={props.multi}
      />
      {props.touched &&
        props.error &&
        <span className="help-block">
          {props.error}
        </span>}
    </div>
  )
};