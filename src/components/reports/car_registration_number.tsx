import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carRegistrationNumbersWithCarColor } from "../../actions/common";
import CarSelectionTag from '../common/car_selection_tag';
import { capitalizeLabel } from '../../helpers/common';

interface Props {
  carRegistrationNumbersWithCarColor({ url, color }: { url: string; color: string }): any;
}

const CarRegistrationNumbers = (props: Props) => {
  const [car_color, handleSelect] = useState('');
  const [car_registration_numbers, handleResponse] = useState([]);

  useEffect(() => {
    const { carRegistrationNumbersWithCarColor } = props;
    if (car_color) {
      carRegistrationNumbersWithCarColor({
        url: '/tickets/car_registration_numbers_with_car_color', color: car_color
      })
        .then((response: { data: any[]; }) => {
          const carRegistrationNumbers = response?.data || []
          handleResponse(carRegistrationNumbers);
        })
    }
  }, [car_color])

  const carRegistrationNumbersLength = car_registration_numbers.length || 0;

  return (
    <>
      <CarSelectionTag
        parentClassName="col-md-3 car-registration-numbers-select-tag"
        handleChange={(color) => handleSelect(color)}
      />
      <div className="col-md-12 car-registration-numbers-list">
        {
          ((carRegistrationNumbersLength <= 0) && car_color) && (
            <div className='col-md-12 no-cars-found-with-color'>
              No cars registrated with {capitalizeLabel(car_color, true)} color
            </div>
          )
        }
        {
          (carRegistrationNumbersLength > 0) && (
            <div className='col-md-12 list-of-car-numbers-registrated-with-color'>
              Car Registration Numbers
            </div>
          )
        }
        <ol>
          {
            car_registration_numbers?.map((regNumber) => {
              return (
                <li key={regNumber}>{regNumber}</li>
              )
            })
          }
        </ol>
      </div>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    carRegistrationNumbersWithCarColor,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(CarRegistrationNumbers);