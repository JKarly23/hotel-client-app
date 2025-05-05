import {
  BrowserRouter as Routers,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import PublicRouter from './routers/PublicRouter';
import AuthRouter from './routers/AuthRouter';
import BookingRoute from './routers/BookingRoute';
import UserRouter from './routers/UserRouter';

function App() {

  return (
    <>
      <Routers>
        <Routes>
          <Route path='/*' element={<PublicRouter />} />
          <Route path='/auth/*' element={<AuthRouter />} />
          <Route path='/booking/*' element={<BookingRoute />} />
          <Route path='/profile/*' element={<UserRouter />} />
        </Routes>
      </Routers>
    </>
  )
}

export default App
