import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productID: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductID(state, action) {
      state.productID = action.payload;
    },
  },
});

export const { setProductID } = productSlice.actions;

export default productSlice.reducer;
