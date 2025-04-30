import { useState } from 'react';
import {
  BrowserRouter as Routers,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import PublicRouter from './routers/PublicRouter';
import AuthRouter from './routers/AuthRouter';

function App() {

  return (
    <>
      <Routers>
        <Routes>
          <Route path='/*' element={<PublicRouter />} />
          <Route path='/auth/*' element={<AuthRouter />} />
        </Routes>
      </Routers>
    </>
  )
}

export default App
