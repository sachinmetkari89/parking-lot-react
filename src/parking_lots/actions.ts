import * as constants from "./constants";
import axios from "../utils/axios";
import {
  ChangeParkingLotStatusPayloadType, FetchParkingListsActionPayloadType,
  GenerateParkingListActionType,
} from "./type";

export const changeParkingLotStatus = (payload: ChangeParkingLotStatusPayloadType) => {
  return { type: constants.CHANGE_PARKING_LOT_STATUS, ...payload }
}

export const startFetchingRequest = () => {
  return { type: constants.FETCHING_REQUEST }
}

export const fetchParkingListsAction = (payload: FetchParkingListsActionPayloadType) => {
  return { type: constants.SET_ITEMS, ...payload }
}

const generateParkingListAction = (payload: GenerateParkingListActionType) => {
  return { type: constants.ITEM_FETCHED, ...payload }
}

export function fetchParkingLists() {
  return (dispatch) => {
    dispatch(startFetchingRequest());
    return axios({
      url: '/parking_lots',
      method: 'get',
    })
      .then((response) => {
        const parking_lists = response?.data || [];
        dispatch(fetchParkingListsAction({ items: parking_lists }));
        return response;
      })
      .catch((error) => {
        throw error.response;
      });
    }
  }

  export function generateParkingLot() {
    return (dispatch) => {
      dispatch(startFetchingRequest());
      return axios({
        url: '/parking_lists',
        method: 'post',
      })
        .then((response) => {
          const { parking_list } = response?.data || {};
          dispatch(generateParkingListAction({ item: parking_list || {} }));
          return response;
        })
        .catch((error) => {
          throw error.response;
        });
      }
    }
