import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from './utils/axios.ts';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BASE_URL } from './constants/common.ts';
import store from './store/store.ts';
import Routes from './routes/index.tsx';
import { fetchParkingListsAction } from './parking_lots/actions';

const ParkingWebApp = () => {
  useEffect(() => {
    axios({
      url: '/parking_lots',
      method: 'get',
      baseURL: `${BASE_URL}`,
    })
      .then((response) => {
        const { parking_lists } = response.data;
        fetchParkingListsAction({ items: parking_lists });
      })
      .catch((error) => {
        // handleErrors(error, '/login');
      });
  }, []);

  return (
    <Provider store={store}>
      {Routes}
    </Provider>
  );
};

ReactDOM.render(<ParkingWebApp />,
  document.getElementById('main-wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
