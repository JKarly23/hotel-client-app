import { configureStore } from '@reduxjs/toolkit'
import  authReducer from '../feautere/auth/authSlice'
import  errorsReducer from '../feautere/errors/errorSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer,
  },
})