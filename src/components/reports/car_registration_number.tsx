import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carRegistrationNumbersWithCarColor } from "../../actions/common";
import CarSelectionTag from '../fields/car_selection_tag';
import OrderdList from '../common/orderd_list';
import { renderRegNoDataText } from './helper';
import Spinner from '../common/spinner';

interface Props {
  carRegistrationNumbersWithCarColor({ url, color }: { url: string; color: string }): any;
}

const CarRegistrationNumbers = (props: Props) => {
  const [isLoading, handleLoading] = useState<boolean>(false);
  const [car_color, handleSelect] = useState('');
  const [car_registration_numbers, handleResponse] = useState([]);

  useEffect(() => {
    const { carRegistrationNumbersWithCarColor } = props;
    if (car_color) {
      handleLoading(true);
      carRegistrationNumbersWithCarColor({
        url: '/tickets/car_registration_numbers_with_car_color',
        color: car_color
      })
        .then((response: { data: any[]; }) => {
          const carRegistrationNumbers = response?.data || []
          handleResponse(carRegistrationNumbers);
          handleLoading(false);
        })
        .catch(() => {
          handleLoading(false);
        })
    }
  }, [car_color])

  const carRegistrationNumbersLength = car_registration_numbers.length || 0;

  return (
    <div className='row car-registration-numbers-section'>
      <div className='col-md-4 fields'>
        <CarSelectionTag
          parentClassName="col-md-10 car-registration-numbers-select-tag"
          handleChange={(color) => handleSelect(color)}
        />
        <Spinner
          isLoading={isLoading}
          parentClassName="col-md-2 ticket-numbers-tab-loader"
        />
      </div>
      <div className="col-md-8 car-registration-numbers-list">
        {renderRegNoDataText({ carRegNosLength: carRegistrationNumbersLength, carColor: car_color })}

        <OrderdList items={car_registration_numbers} />
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    carRegistrationNumbersWithCarColor,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(CarRegistrationNumbers);