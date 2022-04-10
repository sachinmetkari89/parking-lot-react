import React, { memo } from 'react'

interface TicketDetailProps {
  car_color: string;
  car_reg_number: string;
  number: string;
  parking_lot_number: string;
}

const ticketDetails = [
  { label: 'Car Color', key: 'car_color' },
  { label: 'Car Reg. Number', key: 'car_reg_number' },
  { label: 'Ticket Number', key: 'number' },
  { label: 'Parking Lot Number', key: 'parking_lot_number' }
]

const TicketDetails = (props: TicketDetailProps) => (
  <div className='ticket_details'>
    <ul>
      {
        ticketDetails.map((ticket) => {
          return (<li key={ticket.key}><b>{ticket.label} :</b> {props?.[ticket.key] || ''}</li>)
        })
      }
    </ul>
  </div>
)

export default memo(TicketDetails);