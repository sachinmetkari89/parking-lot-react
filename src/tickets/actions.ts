import * as constants from "./constants";
import axios from "../utils/axios";
import { ALLOCATED } from "../parking_lots/constants";
import { changeParkingLotStatus } from "../parking_lots/actions";

export const startFetchingRequest = () => {
  return {
    type: constants.FETCHING_REQUEST
  }
}

export const fetchTicketListsAction = (payload) => {
  return {
    type: constants.SET_ITEMS,
    ...payload,
  }
}

export function fetchTicketLists() {
  return (dispatch) => {
    dispatch(startFetchingRequest());
    return axios({
      url: '/parking_lists',
      method: 'get',
    })
      .then((response) => {
        const { parking_lists } = response.data;
        dispatch(fetchTicketListsAction({ items: parking_lists }));
        return response;
      })
      .catch((error) => {
        throw error.response;
      });
    }
  }

const generateTicketAction = (payload) => {
    return {
      type: constants.ITEM_FETCHED,
      ...payload,
    }
  }

  export function generateTicket(data) {
    return (dispatch) => {
      dispatch(startFetchingRequest());
      return axios({
        url: '/tickets',
        method: 'post',
        data: {
          ticket: data,
        }
      })
        .then((response) => {
          const ticket = response?.data || {};
          dispatch(changeParkingLotStatus({ parking_lot_id: ticket?.parking_lot_id || '', status: ALLOCATED }));
          dispatch(generateTicketAction({ item: ticket || {} }));
          return response;
        })
        .catch((error) => {
          throw error.response;
        });
      }
    }
