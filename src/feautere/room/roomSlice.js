import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  selectedRoom: JSON.parse(localStorage.getItem('room')) || {}
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setRoom: (state, action) => {
      state.selectedRoom = action.payload;
      localStorage.setItem('room', JSON.stringify(state.selectedRoom))
    }
  },
});

export const { setRooms, setRoom } = roomSlice.actions;
export default roomSlice.reducer;
