import React, { useState } from 'react';
import { getFieldErrors } from '../../helpers/common';
import TicketDetails from './details';
import CarSelectionTag from '../../components/common/car_selection_tag';

interface Props {
  generateTicket(data: Record<string, any>): any;
}

const FormComponent = (props: Props) => {
  const [isLoading, handleLoading] = useState(false);
  const [car_reg_number, handleChange] = useState('');
  const [car_color, handleSelect] = useState('');
  const [errors, handleErrors] = useState({});
  const [data, responseData] = useState<null | { id: number, car_color: string, car_reg_number: string, number: string, parking_lot_number: string }>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set isLoading to true before sending ticket generation request.
    handleLoading(true);
    // Store response data
    responseData(null);

    const { generateTicket } = props;

    generateTicket({ car_color, car_reg_number })
      .then((response) => {
        // Handling Errors
        handleErrors({});
        // Set isLoading to false
        handleLoading(false);
        // Store response data
        responseData(response?.data || {});
      })
      .catch((error) => {
        const errors = error?.data?.errors || {};
        // Handling Errors
        handleErrors(errors);
        // We clear the previous stored data from state.
        responseData(null);
        // Set isLoading to false
        handleLoading(false);
      })
  }

  return (
    <>
      <span className="errors-message">{getFieldErrors({ errors, errorKeys: ['base', 'parking_lot'] })}</span>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3" id="car-reg-number">
          <label className="form-label">Car Reg. No.</label>
          <input
            placeholder="Car registration number"
            type="text"
            id="car-reg-number"
            className="form-control"
            value={car_reg_number}
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            autoComplete="off"
          />
          <span className="errors-message">{getFieldErrors({ errors, errorKeys: ['car_reg_number'] })}</span>
        </div>
        <CarSelectionTag
          showErrors
          errors={errors}
          handleChange={(color) => handleSelect(color)}
        />
        <button className='btn btn-primary' type="submit">
          {isLoading ? <><i className="fa fa-spinner fa-spin" />&nbsp;</> : null}
          Generate Ticket
        </button>
        <br />
        <br />
        {
          (data?.id) ?
            <TicketDetails
              car_color={data?.car_color}
              car_reg_number={data?.car_reg_number}
              number={data?.number}
              parking_lot_number={data?.parking_lot_number}
            />
            : null
        }
      </form >
    </>
  )
}

export default FormComponent;
