import React, { useState, useEffect } from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchTicketNumbers } from "../../actions/common";
import CarSelectionTag from '../fields/car_selection_tag';
import { useDebounce } from "../../custom_hooks/debounce";
import InputField from '../fields/input_field';
import { renderTicketsDataText } from './helper';
import OrderdList from '../common/orderd_list';
import Spinner from '../common/spinner';

interface Props {
  fetchTicketNumbers({ url, color, reg_number }: { url: string, color?: string, reg_number?: string }): any;
}

const TicketNumbers = (props: Props) => {
  const [isLoading, handleLoading] = useState<boolean>(false);
  const [car_color, handleSelect] = useState<string>('');
  const [reg_number, handleRegNumberChange] = useState<string>('');
  const [ticketNumbers, handleResponse] = useState<any[]>([]);

  // We use debounce to avoid fetching api call on input fields data change.
  const debouncedRegNumber = useDebounce<string>(reg_number, 300);

  // We fetching '/tickets/ticket_numbers_with_car_color' api.
  useEffect(() => {
    const { fetchTicketNumbers } = props;
    if (car_color) {
      // Handle isLoading to true
      handleLoading(true);
      handleRegNumberChange('');
      handleResponse([]);
      // Call fetchTicketNumbers action to fetch ticket numbers.
      fetchTicketNumbers({
        url: '/tickets/ticket_numbers_with_car_color',
        color: car_color
      })
        .then((response: { data: any[]; }) => {
          // We saving response data ie. ticket numbers in ticketNumbers state.
          const ticketNumbers = response?.data || []
          handleResponse(ticketNumbers);
          // Handle isLoading to false
          handleLoading(false);
        })
        .catch(() => {
          // Handle isLoading to false
          handleLoading(false);
        })
    }
  }, [car_color])

  // We fetching '/tickets/ticket_number_with_car_reg_number' api.
  useEffect(() => {
    const { fetchTicketNumbers } = props;
    if (debouncedRegNumber) {
      // Handle isLoading to true
      handleLoading(true);
      handleSelect('');
      handleResponse([]);
      // Call fetchTicketNumbers action to fetch ticket numbers.
      fetchTicketNumbers({
        url: '/tickets/ticket_number_with_car_reg_number',
        reg_number: debouncedRegNumber
      })
        .then((response: { data: any[]; }) => {
          // We saving response data ie. ticket numbers in ticketNumbers state.
          const ticketNumber = response?.data || ''
          const updatedTicketNumber = ticketNumber ? [ticketNumber] : []
          handleResponse(updatedTicketNumber);
          // Handle isLoading to false
          handleLoading(false);
        })
        .catch(() => {
          // Handle isLoading to false
          handleLoading(false);
        })
    }
  }, [debouncedRegNumber])

  const ticketNosLength = ticketNumbers.length

  return (
    <>
      <div className='col-md-12 ticket-numbers-form-section'>
        <InputField
          fieldIdName="car-reg-number"
          label='Car Reg. No.'
          placeholder="Car registration number"
          value={reg_number}
          handleChange={(value) => handleRegNumberChange(value)}
        />

        <CarSelectionTag
          parentClassName="col-md-3 car-registration-numbers-select-tag"
          handleChange={(color) => handleSelect(color)}
        />

        <Spinner
          isLoading={isLoading}
          parentClassName="col-md-1 ticket-numbers-tab-loader"
        />
      </div>

      <div className="col-md-12 car-ticket-numbers-parent-list">
        {renderTicketsDataText({ ticketNosLength, carColor: car_color, regNumber: reg_number })}

        <OrderdList items={ticketNumbers} />
      </div>
    </>
  );
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators({ fetchTicketNumbers }, dispatch);
}

export default connect(null, mapDispatchToProps)(TicketNumbers);