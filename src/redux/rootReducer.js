import { combineReducers } from 'redux';
// import fabricReducer from './reducers/FabricReducer';
import formReducer from './reducers/formReducer';
import productSlice from './reducers/productSlice';
import cartReducer from './reducers/cartReducer'
// Combine all reducers
const rootReducer = combineReducers({
  // fabric: fabricReducer ,
  form: formReducer,
  productID: productSlice, 
  cart: cartReducer, 
});

export default rootReducer;
