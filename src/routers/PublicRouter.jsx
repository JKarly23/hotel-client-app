import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Room from '../pages/Room';

const PublicRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rooms' element={<Room/>} />
        <Route path='/rooms/:id' element={<Room/>} />
        <Route path='/contact' element={<div>Contact</div>} />
      </Routes>
    </div>
  )
}

export default PublicRouter
