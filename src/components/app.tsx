import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParkingLists } from "../parking_lots/actions";
import ParkingLots from '../parking_lots/components/index';
import { generateTicket } from "../tickets/actions";
import TicketForm from "../tickets/components/form";
import ReportSection from './reports/report_section';

interface Props {
  fetchParkingLists: any;
  generateTicket(data: Record<string, any>): any;
  parkingLots: any;
}

const App = (props: Props) => {
  useEffect(() => {
    const { fetchParkingLists } = props;
    fetchParkingLists()
  }, [])

  return (
    <div className='row parking-management'>
      <div className='col-md-12 title'>
        <h4 className='parking-management-title'>Parking Management</h4>
      </div>
      <div className='col-md-12 content-section'>
        <div className='col-md-8 parking-lots-table'>
          <ParkingLots parkingLots={props?.parkingLots || {}} />
        </div>
        <div className='col-md-4 ticket-form'>
          <TicketForm generateTicket={props.generateTicket} />
        </div>
      </div>
      <div className='col-md-12 reports-section'>
        <ReportSection />
      </div>
    </div>
  )
}

function mapStateToProps(state, props) {
  const { parkingLots } = state;
  return {
    parkingLots: parkingLots || {},
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchParkingLists,
    generateTicket,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);