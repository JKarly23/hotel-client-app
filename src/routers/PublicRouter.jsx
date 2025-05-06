import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Room from '../pages/Room';
import Navbar from '../components/ui/Navbar';
import RoomDetail from '../components/rooms/RoomDetail';
import Contact from '../pages/Contact';

const PublicRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Room />} />
        <Route path='/room/:id' element={<RoomDetail />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default PublicRouter
