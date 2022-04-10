import React from 'react'

interface SpinnerTypes {
  isLoading: boolean;
  parentClassName: string;
}

const Spinner = (props: SpinnerTypes) => {
  const { isLoading, parentClassName } = props;
  if (isLoading) {
    return (
      <div className={parentClassName}>
        <i className="fa fa-spinner fa-spin" />&nbsp;
      </div>
    )
  }
  return null;
}

export default Spinner;