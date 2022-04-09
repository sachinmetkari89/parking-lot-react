import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTicketNumbers } from "../../actions/common";
import CarSelectionTag from '../common/car_selection_tag';
import { capitalizeLabel } from '../../helpers/common';
import { useDebounce } from "../../custom_hooks/debounce";

interface Props {
  fetchTicketNumbers({ url, color, reg_number }: { url: string, color?: string, reg_number?: string }): any;
}

const TicketNumbers = (props: Props) => {
  const [isLoading, handleLoading] = useState(false);
  const [car_color, handleSelect] = useState('');
  const [reg_number, handleRegNumberChange] = useState('');
  const [ticketNumbers, handleResponse] = useState([]);

  const debouncedRegNumber = useDebounce(reg_number, 500);

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
        url: '/tickets/ticket_numbers_with_car_color', color: car_color
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
        url: '/tickets/ticket_number_with_car_reg_number', reg_number: debouncedRegNumber
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

  const ticketNumbersLength = ticketNumbers.length

  return (
    <>
      <div className='col-md-12 ticket-numbers-form-section'>
        <div className="col-md-3" id="car-reg-number">
          <label className="form-label">Car Reg. No.</label>
          <input
            placeholder="Car registration number"
            type="text"
            id="car-reg-number"
            className="form-control"
            value={reg_number}
            onChange={(event) => handleRegNumberChange(event.target.value)}
            autoComplete="off"
          />
        </div>
        <CarSelectionTag
          parentClassName="col-md-3 car-registration-numbers-select-tag"
          handleChange={(color) => handleSelect(color)}
        />
        {
          isLoading ? <div className="col-md-1 ticket-numbers-tab-loader">
            <i className="fa fa-spinner fa-spin" />&nbsp;</div> : null
        }
      </div>

      <div className="col-md-12 car-ticket-numbers-parent-list">
        {
          ((ticketNumbersLength <= 0) && car_color) && (
            <div className='col-md-12 no-car-ticket-numbers-found-with-car-color'>
              No ticket(s) found for {capitalizeLabel(car_color, true)} color car.
            </div>
          )
        }
        {
          ((ticketNumbersLength <= 0) && reg_number) && (
            <div className='col-md-12 no-car-ticket-numbers-found-with-registration-number'>
              No ticket(s) found for {capitalizeLabel(reg_number, true)} registration number.
            </div>
          )
        }
        {
          ((ticketNumbersLength > 0) && car_color) && (
            <div className='col-md-12 car-ticket-numbers-label'>
              {capitalizeLabel(ticketNumbersLength, true)} Ticket found(s) for {capitalizeLabel(car_color, true)} color car.
            </div>
          )
        }
        {
          ((ticketNumbersLength > 0) && reg_number) && (
            <div className='col-md-12 car-ticket-numbers-label'>
              {capitalizeLabel(ticketNumbersLength, true)} Ticket(s) found for {capitalizeLabel(reg_number, true)} registration number.
            </div>
          )
        }
        <ol>
          {
            ticketNumbers?.map((ticketNumber, idx) => {
              return (
                <li key={idx}>{ticketNumber}</li>
              )
            })
          }
        </ol>
      </div>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTicketNumbers }, dispatch);
}

export default connect(null, mapDispatchToProps)(TicketNumbers);