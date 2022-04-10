import React from 'react'

interface FormSubmitButtonTypes {
  isLoading?: boolean;
  buttonName?: string;
  buttonClassName?: string;
}

const FormSubmitButton = (props: FormSubmitButtonTypes) => {
  const { isLoading, buttonName, buttonClassName } = props;
  return (
    <button className={buttonClassName} type="submit">
      {isLoading ? <><i className="fa fa-spinner fa-spin" />&nbsp;</> : null}
      {buttonName}
    </button>
  )
}

FormSubmitButton.defaultProps = {
  isLoading: false,
  buttonName: 'Submit',
  buttonClassName: 'btn btn-primary',
}

export default FormSubmitButton;
