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
    },
    updateRoom: (state, action) => {
      state.rooms = state.rooms.map((room) => room.id === action.payload.id
        ? action.payload
        : room)
    },
    deleteRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
    },
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    }
  },
});

export const { setRooms, setRoom, addRoom, deleteRoom, updateRoom } = roomSlice.actions;
export default roomSlice.reducer;
