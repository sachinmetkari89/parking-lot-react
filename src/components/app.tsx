import React from 'react'
import ParkingLots from '../parking_lots/components/index';
import TicketForm from "../tickets/components/form";
import ReportSection from './reports/report_section';

const App = () => {
  return (
    <div className='row parking-management'>
      <div className='col-md-12 title'>
        <h4 className='parking-management-title'>Parking Management</h4>
      </div>
      <div className='col-md-12 content-section'>
        <div className='col-md-8 parking-lots-table'>
          <ParkingLots />
        </div>
        <div className='col-md-4 ticket-form'>
          <TicketForm />
        </div>
      </div>
      <div className='col-md-12 reports-section'>
        <ReportSection />
      </div>
    </div>
  )
}

export default App;