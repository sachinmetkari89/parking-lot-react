import { combineReducers } from 'redux';
import parkingLots from "../parking_lots/reducer";
import tickets from "../tickets/reducer";

// Combine all reducers by using combineReducers method provided by redux.
const CreateReducer = () => combineReducers({
    parkingLots,
    tickets
  });

export default CreateReducer;
