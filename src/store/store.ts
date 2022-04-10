import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import CreateReducer from '../reducers/index';

export default (() => {
  // const initialState = {};
  // Create the store
  // create store is a function shipped with redux that takes in the reducer,
  // the preloaded state if any, and enhancers
  // otherwise it will log thunk and promise, not actual actions
  let middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware];
  }
  //  We create store first arg is list of Combined reducers and second arg is list of all middleware.
  const store:any = createStore(CreateReducer(), composeWithDevTools(applyMiddleware(...middleware)));

  store.async = {};
  // Async reducer registry, adding an extra attribute to the store object
  return store;
})();
