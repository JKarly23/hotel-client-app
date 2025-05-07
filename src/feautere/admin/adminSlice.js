import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  seccionSelected: '',
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSeccionSelected: (state, action) => {
      state.seccionSelected = action.payload;
    },
  },
});

export const { setSeccionSelected} = adminSlice.actions;
export default adminSlice.reducer;
