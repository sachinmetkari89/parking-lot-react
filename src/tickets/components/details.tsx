import React, { memo } from 'react'

interface TicketDetailProps {
  car_color: string;
  car_reg_number: string;
  number: string;
  parking_lot_number: string;
}

const TicketDetails = (props: TicketDetailProps) => (
  <div className='ticket_details'>
    <ul>
      <li><b>Car Color :</b> {props?.car_color || ''}</li>
      <li><b>Car Reg. Number :</b> {props?.car_reg_number || ''}</li>
      <li><b>Ticket Number :</b> {props?.number || ''}</li>
      <li><b>Parking Lot Number :</b> {props?.parking_lot_number || ''}</li>
    </ul>
  </div>
)

export default memo(TicketDetails);