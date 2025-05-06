import {
  BrowserRouter as Routers,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import PublicRouter from './routers/PublicRouter';
import AuthRouter from './routers/AuthRouter';
import BookingRouter from './routers/BookingRouter';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';

function App() {

  return (
    <>
      <Routers>
        <Routes>
          <Route path='/*' element={<PublicRouter />} />
          <Route path='/auth/*' element={<AuthRouter />} />
          <Route path='/booking/*' element={<BookingRouter />} />
          <Route path='/profile/*' element={<UserRouter />} />
          <Route path='/admin/*' element={<AdminRouter />} />
        </Routes>
      </Routers>
    </>
  )
}

export default App
