import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Routes, Route } from 'react-router-dom';
import AdminPortada from '../components/admin/AdminPortada';
import BookingTable from '../components/admin/booking/BookingTable';
import RoomTable from '../components/admin/room/RoomTable';
import UserTable from '../components/admin/user/UserTable';


const AdminRouter = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user || !['admin', 'recepcionist'].includes(user.role)) return <Navigate to={'/auth/login'} />
    return (
        <Routes>
            <Route path='/' element={<AdminPortada />} />
            <Route path='/booking' element={<BookingTable />} />
            <Route path='/room' element={<RoomTable />} />
            <Route path='/user' element={<UserTable />} />
        </Routes>
    )
}

export default AdminRouter
