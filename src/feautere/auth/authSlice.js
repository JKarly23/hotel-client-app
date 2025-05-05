import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
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
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
