import * as constants from "./constants";
import { ActionTypes, StateTypes } from "./type";

export const initialState = {
  items: [],
  total_count: 0,
  isError: false,
  errors: {},
  isFetching: false,
};

const tickets = (state: StateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case constants.FETCHING_REQUEST: {
        return {
          ...state,
          isError: false,
          errors: {},
          isFetching: true,
        }
    }
    case constants.SET_ITEMS: {
      const items = action.items || []
      return {
        ...state,
        items: action?.items || [],
        totalCount: items.length,
        isError: false,
        errors: {},
        isFetching: false,
      }
    }
    case constants.ITEM_FETCHED: {
      const items = state?.items || []
      const updatedItems = items?.map((item) => {
        if (item.id !== action.item.id) return item;
        return action.item;
      })
      return {
        ...state,
        items: updatedItems || [],
        totalCount: updatedItems.length,
        isError: false,
        errors: {},
        isFetching: false,
      }
    }
    case constants.UPDATE_ITEM: {
      const items = state?.items || []
      const updatedItems = items?.map((item) => {
        if (item.id !== action.item.id) return item;
        return action.item;
      })
      return {
        ...state,
        items: updatedItems || [],
        totalCount: updatedItems.length,
        isError: false,
        errors: {},
        isFetching: false,
      }
    };
    case constants.DELETE_ITEM: {
      const items = state?.items || []
      const updatedItems = items?.filter((item) => {
        return (item.id !== action.id)
      })
      return {
        ...state,
        items: updatedItems || [],
        totalCount: updatedItems.length,
        isError: false,
        errors: {},
        isFetching: false,
      }
    };
    default:
      return state;
  }
}

export default tickets;