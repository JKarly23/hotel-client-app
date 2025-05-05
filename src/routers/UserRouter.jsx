import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '../pages/UserProfile';
import { useSelector } from 'react-redux';
import Navbar from '../components/ui/Navbar';

const UserRouter = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to='/auth/login' />
    }
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<UserProfile />} />
                {/* <Route path='/edit' element={<UserEdit/>}/> */}
            </Routes>

        </div>
    )
}

export default UserRouter
