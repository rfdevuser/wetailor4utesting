import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Fabric {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FabricState {
  fabrics: Fabric[];
  liningFabrics: Fabric[]; // New state for lining fabrics
}

const initialState: FabricState = {
  fabrics: [],
  liningFabrics: [], // Initialize lining fabrics
};

const fabricSlice = createSlice({
  name: 'fabrics',
  initialState,
  reducers: {
    addFabric: (state, action: PayloadAction<Fabric>) => {
      state.fabrics.push(action.payload);
    },
    addLiningFabric: (state, action: PayloadAction<Fabric>) => {
      state.liningFabrics.push(action.payload); // Update for lining fabric
    },
  },
});

export const { addFabric, addLiningFabric } = fabricSlice.actions;

export default fabricSlice.reducer;
