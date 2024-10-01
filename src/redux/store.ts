import { configureStore } from '@reduxjs/toolkit';
import fabricReducer from './reducers/fabricSlice';
import formReducer from './reducers/formReducer';
import rootReducer from './rootReducer'
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
