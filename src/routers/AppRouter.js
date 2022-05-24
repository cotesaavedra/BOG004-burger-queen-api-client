
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<LoginScreen />} />

      <Route path='/*' element={
        <PrivateRoute>
          <DashboardRoutes />
        </PrivateRoute>


      }
      />

    </Routes>
    </BrowserRouter >
  )
}
