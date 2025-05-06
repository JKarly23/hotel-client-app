import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import Booking from '../components/booking/Booking'
import { useSelector } from 'react-redux'

const BookingRouter = () => {
    const user = useSelector((state) => state.auth);
    return !user
        ? < Navigate to='/auth/login' />
        : <>
            <Navbar />
            <Routes>
                <Route path=':id' element={<Booking />} />
            </Routes>
        </>

}

export default BookingRouter
