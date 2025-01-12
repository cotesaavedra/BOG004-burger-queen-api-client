import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import { AdminScreen } from '../components/adm/AdminScreen';
import { ChefScreen } from '../components/chef/ChefScreen';
import { LoginScreen } from '../components/login/LoginScreen';
import { OrdersScreen } from '../components/Orders/OrdersScreen/OrdersScreen';
import { ViewProducts } from '../components/products/ViewProducts/ViewProducts';
import { Navbar } from '../components/ui/top/Navbar';
import { WaiterScreen } from '../components/waiter/WaiterScreen';
import { ProtectedRoute } from './ProtectedRoute';

export const DashboardRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/waiter' element={
          <ProtectedRoute isAllowed={user.roles.waiter}>
            <WaiterScreen />
          </ProtectedRoute>}
        />
        <Route path='/waiter/orders' element={
          <ProtectedRoute isAllowed={user.roles.waiter}>
            <OrdersScreen />
          </ProtectedRoute>}
        />
        <Route path='/chef' element={
          <ProtectedRoute isAllowed={user.roles.chef}>
            <ChefScreen />
          </ProtectedRoute>}
        />
        <Route path='/admin' element={
          <ProtectedRoute isAllowed={user.roles.admin}>
            <AdminScreen />
          </ProtectedRoute>}
        />
        <Route path='/admin/products' element={
          <ProtectedRoute isAllowed={user.roles.admin}>
            <ViewProducts />
          </ProtectedRoute>}
        />
        <Route
          path="*"
          element={<Navigate to={user.roles.waiter ? '/waiter' : user.roles.chef ? '/chef' : user.roles.admin ? '/admin' : <LoginScreen/>} replace />}
        />
      </Routes>
    </>
  )
}