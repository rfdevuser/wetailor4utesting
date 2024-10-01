// Form.reducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  } 
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData[action.payload.fieldName] = action.payload.fieldValue;
    },
    resetFormData: (state) => {
      state.formData = {
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      };
    }
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;

export default formSlice.reducer;
