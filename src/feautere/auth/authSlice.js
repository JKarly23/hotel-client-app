import { createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../services/AuthService';

const savedUser = JSON.parse(localStorage.getItem('user'));
const userService = new AuthService()

const initialState = {
  users: [],
  user: savedUser || {},
  isAuthenticated: !!savedUser,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      userService.logout(action.payload)
    },
    updateUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user) => user.id === action.payload.id
        ? action.payload
        : user);
    },
    updateUserBookings: (state, action) => {
      state.user.bookings = state.user.bookings.map(booking =>
        booking.id === action.payload.id ? action.payload : booking
      );
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUser(state, action) {
      state.users = [...state.users, action.payload]
    },
    setUsers(state, action) {
      state.users = action.payload;
    }
  },
});

export const { setUser, logout, updateUser, addUser, deleteUser, setUsers } = authSlice.actions;
export default authSlice.reducer;
