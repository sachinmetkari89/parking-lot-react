import { combineReducers } from 'redux';
import parkingLots from "../parking_lots/reducer";
import tickets from "../tickets/reducer";

const createReducer = () => {
  return combineReducers({
    parkingLots,
    tickets
  });
}

export default createReducer;
