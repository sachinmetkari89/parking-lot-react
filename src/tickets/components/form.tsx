import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateTicket } from "../actions";
import { getFieldErrors } from '../../helpers/common';
import TicketDetails from './details';
import CarSelectionTag from '../../components/fields/car_selection_tag';
import InputField from '../../components/fields/input_field';
import FormSubmitButton from '../../components/buttons/form_submit_button';

interface Props {
  generateTicket(data: Record<string, any>): any;
}

const FormComponent = (props: Props) => {
  const [isLoading, handleLoading] = useState<boolean>(false);
  const [car_reg_number, handleChange] = useState<string>('');
  const [car_color, handleSelect] = useState<string>('');
  const [errors, handleErrors] = useState<Record<string, any>>({});
  const [data, responseData] = useState<Record<string, any>>(null);

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
        <InputField
          parentClassName='mb-3'
          fieldIdName="car-reg-number"
          label='Car Reg. No.'
          placeholder="Car registration number"
          value={car_reg_number}
          handleChange={(value) => handleChange(value)}
          showError
          errors={errors}
          errorKeys={['car_reg_number']}
        />
        <CarSelectionTag
          showErrors
          errors={errors}
          handleChange={(color) => handleSelect(color)}
        />
        <FormSubmitButton
          isLoading={isLoading}
          buttonName="Generate Ticket"
        />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ generateTicket }, dispatch);
}

export default connect(null, mapDispatchToProps)(FormComponent);