import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store.ts';
import Routes from './routes/index.tsx';
import "./style/custom.css";

const ParkingWebApp = () => (
  <Provider store={store}>
    {Routes}
  </Provider>
);

ReactDOM.render(<ParkingWebApp />,
  document.getElementById('main-wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
