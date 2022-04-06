import React from 'react';
import { Table } from 'react-bootstrap'
import capitalize from "lodash/capitalize";

interface Props {
  parkingLots?: {
    items: Record<string, any>[];
  };
}

const ParkingLots = (props: Props) => {
  const items = props?.parkingLots?.items || []
  return (
    <Table>
      <thead>
        <tr>
          <th className="col-md-1">#</th>
          <th>Slot Number</th>
          <th>Distance From Entry Point(Feet)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
          items?.map((item, idx) => {
            return (
              <tr key={item?.id} className={`parking_tr_${item.status}`}>
                <td className="col-md-1">{idx + 1}</td>
                <td>{item.slot_number}</td>
                <td>{item.distance_from_entry_point}</td>
                <td>{capitalize(item.status)}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

ParkingLots.defaultProps = {
  ParkingLots: {},
}

export default ParkingLots;