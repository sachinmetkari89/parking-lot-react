import {
  SET_PARKING_LOTS, PARKING_LOT_FETCHED, UPDATE_PARKING_LOT,
  DELETE_PARKING_LOT
} from './constants';

export const initialState = {
  items: [],
  total_count: 0,
  isError: false,
  errors: {},
  isFetching: false,
};

const parkingLots = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARKING_LOTS: {
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
    case PARKING_LOT_FETCHED: {
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
    case UPDATE_PARKING_LOT: {
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
    case DELETE_PARKING_LOT: {
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
    }
    default:
      return state;
  }
}

export default parkingLots;