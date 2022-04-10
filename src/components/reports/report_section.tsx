import React, { useState } from 'react'
import { Tabs, Tab } from "react-bootstrap";
import TicketNumbers from './ticket_numbers';
import CarRegistrationNumbers from './car_registration_number';

const ReportSection = () => {
  const [key, setKey] = useState<string>('car_reg_numbers_with_color');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {/* Car Registration Numbers Tab */}
      <Tab eventKey="car_reg_numbers_with_color" title="Car Registration No's">
        <CarRegistrationNumbers />
      </Tab>

      {/* Ticket Number Tab */}
      <Tab eventKey="ticket_numbers" title="Ticket Numbers">
        <TicketNumbers />
      </Tab>

    </Tabs>
  )
}

export default ReportSection;