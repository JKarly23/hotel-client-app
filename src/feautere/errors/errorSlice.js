import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  errors: {},
}

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors: (state, payload) => {
      state.errors = payload.payload;

    },
    removeErrors: (state) => {
        state.errors = {};
    }
  },
})

// Action creators are generated for each case reducer function
export const { setErrors,removeErrors } = errorsSlice.actions

export default errorsSlice.reducer