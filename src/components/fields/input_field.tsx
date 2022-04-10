import React from 'react'
import { getFieldErrors } from '../../helpers/common';

interface InputFieldProps {
  parentClassName?: string;
  fieldIdName: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  inputFieldType: string;
  inputFieldClassName?: string;
  value?: string;
  handleChange(name: string): void;
  autoComplete?: string;
  showError?: boolean;
  errors?: Record<string, any>;
  errorKeys?: string | any[];
}

const InputField = (props: InputFieldProps) => {
  const {
    parentClassName, fieldIdName, labelClassName, label, placeholder, inputFieldType,
    inputFieldClassName, value, handleChange, autoComplete, showError, errors, errorKeys,
  } = props;
  return (
    <div className={parentClassName} id={`${fieldIdName}-parent-class`}>
      <label className={labelClassName}>{label}</label>
      <input
        placeholder={placeholder}
        type={inputFieldType}
        id={`${fieldIdName}-input-field`}
        className={inputFieldClassName}
        value={value || ''}
        onChange={(event) => handleChange(event.target.value)}
        autoComplete={autoComplete}
      />
      {
        showError && (<span className="errors-message">{getFieldErrors({ errors, errorKeys: errorKeys })}</span>)
      }
    </div>
  )
}

InputField.defaultProps = {
  parentClassName: 'col-md-3',
  idName: 'input-field',
  labelClassName: 'form-label',
  label: 'Name',
  placeholder: 'Enter value',
  inputFieldType: 'text',
  inputFieldClassName: 'form-control',
  value: '',
  autoComplete: 'off',
  showError: false,
  errors: {},
  errorKeys: '',
}

export default InputField;
