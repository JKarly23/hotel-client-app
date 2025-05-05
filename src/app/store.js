import { configureStore } from '@reduxjs/toolkit'
import  authReducer from '../feautere/auth/authSlice'
import  errorsReducer from '../feautere/errors/errorSlice'
import roomReducer from '../feautere/room/roomSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer,
    room: roomReducer,
  },
})