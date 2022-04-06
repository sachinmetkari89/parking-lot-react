import React, { useState, useEffect, memo } from 'react'
import { capitalizeLabel, getFieldErrors } from '../../helpers/common';
import { CAR_COLORS } from '../../tickets/constants';

interface CarSelectionTagProps {
  parentClassName?: string;
  showErrors?: boolean;
  errors?: Record<string, any>;
  handleChange(car_color: string): any;
}

const CarSelectionTag = (props: CarSelectionTagProps) => {
  const [car_color, handleSelect] = useState('');

  useEffect(() => {
    const { handleChange } = props;
    if (car_color) {
      handleChange(car_color);
    }
  }, [car_color])

  return (
    <div className={props?.parentClassName || ''} id="car-color">
      <label className="form-label">Select Car Color</label>
      <select
        aria-label="Select Car"
        className="form-select"
        id="car-color-select-tag"
        name="car_color"
        value={car_color}
        onChange={(event) => {
          handleSelect(event.target.value);
        }}
      >
        <option value="">Select Car Color</option>
        {
          CAR_COLORS.map((color) => (
            <option key={color} value={color}>{`${capitalizeLabel(color)}`}</option>
          ))
        }
      </select>
      {
        (props?.showErrors) ?
          <span className="errors-message">
            {getFieldErrors({ errors: props?.errors, errorKeys: ['car_color'] })}
          </span>
          : null
      }
    </div>
  )
}

CarSelectionTag.defaultProps = {
  parentClassName: 'md3',
  errors: {},
  showErrors: false,
}

export default memo(CarSelectionTag);
