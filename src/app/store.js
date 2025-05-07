import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feautere/auth/authSlice'
import errorsReducer from '../feautere/errors/errorSlice'
import roomReducer from '../feautere/room/roomSlice'
import adminReducer from '../feautere/admin/adminSlice'
import bookingReducer from '../feautere/booking/bookingsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer,
    room: roomReducer,
    admin: adminReducer,
    booking: bookingReducer,
  },
})