import {
  SET_TICKETS, TICKET_FETCHED, UPDATE_TICKET,
  DELETE_TICKET
} from './constants';

export const initialState = {
  items: [],
  total_count: 0,
  isError: false,
  errors: {},
  isFetching: false,
};

const tickets = (state = initialState, action) => {
  switch (action.type) {
    case SET_TICKETS: {
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
    case TICKET_FETCHED: {
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
    case UPDATE_TICKET: {
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
    case DELETE_TICKET: {
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