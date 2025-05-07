import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';


const AdminRouter = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user || !['admin', 'recepcionist'].includes(user.role)) return <Navigate to={'/auth/login'} />
    return (
        <Routes>
            <Route path='/' element={<Admin />} />
        </Routes>
    )
}

export default AdminRouter
