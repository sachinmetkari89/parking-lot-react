import { capitalizeLabel } from '../../helpers/common';

interface RenderTicketsDataTextTypes {
  ticketNosLength: number;
  carColor: string;
  regNumber: string;
}

interface RenderRegNoDataTextTypes {
  carRegNosLength: number;
  carColor: string;
}

export const renderTicketsDataText = ({ ticketNosLength, carColor, regNumber }: RenderTicketsDataTextTypes) => {
  if ((ticketNosLength <= 0) && carColor) return <div className='col-md-12'>No ticket(s) found for {capitalizeLabel(carColor, true)} color car.</div>;
  if ((ticketNosLength <= 0) && regNumber) return <div className='col-md-12'>No ticket(s) found for {capitalizeLabel(regNumber, true)} registration number.</div>;
  if ((ticketNosLength > 0) && carColor) return <div className='col-md-12'>{capitalizeLabel(ticketNosLength, true)} Ticket found(s) for {capitalizeLabel(carColor, true)} color car.</div>;
  if ((ticketNosLength > 0) && regNumber) return <div className='col-md-12'>{capitalizeLabel(ticketNosLength, true)} Ticket(s) found for {capitalizeLabel(regNumber, true)} registration number.</div>;
  return null;
}

export const renderRegNoDataText = ({ carRegNosLength, carColor }: RenderRegNoDataTextTypes) => {
  if ((carRegNosLength <= 0) && carColor) return (<div className='col-md-12'>No cars registrated with {capitalizeLabel(carColor, true)} color</div>);
  if (carRegNosLength > 0) return <div className='col-md-12'>Car Registration Numbers</div>;
  return null;
}