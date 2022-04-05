import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../components/app';
import ParkingLots from '../parking_lots/components/index';
import Tickets from '../tickets/components/index';

const AllRoutes = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/parking_lots" element={<ParkingLots />} />
      <Route path="/tickets" element={<Tickets />} />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
