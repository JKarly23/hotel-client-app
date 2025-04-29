import { useState } from 'react';
import {
  BrowserRouter as Routers,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import PublicRouter from './routers/PublicRouter';

function App() {

  return (
    <>
      <Routers>
        <Routes>
          <Route path='/*' element={<PublicRouter />} />
        </Routes>
      </Routers>
    </>
  )
}

export default App
