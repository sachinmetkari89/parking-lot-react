import * as constants from "./constants";
import axios from "../utils/axios";

export const fetchParkingListsAction = (payload) => {
  return {
    type: constants.SET_PARKING_LOTS,
    ...payload,
  }
}

export function fetchParkingLists() {
  // startFetchingRequest(moduleName);
  return (dispatch) => axios({
    url: '/parking_lists',
    method: 'get',
  })
    .then((response) => {
      const { parking_lists } = response.data;
      dispatch(fetchParkingListsAction({ items: parking_lists }));
      return response;
    })
    .catch((error) => {
      // handle error
    });
  }
