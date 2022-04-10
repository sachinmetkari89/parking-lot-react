import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../components/app';
import ParkingLots from '../parking_lots/components/index';
import Tickets from '../tickets/components/index';


const routes = [
  { path: '/', element: <App /> },
  { path: '/parking_lots', element: <ParkingLots /> },
  { path: '/tickets', element: <Tickets /> },
]


const AllRoutes = (
  <BrowserRouter>
    <Routes>
      {
        routes.map((route) => {
          return (
            <Route
              key={`${route.path}-path`}
              path={route.path}
              element={route.element}
            />
          )
        })
      }
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
