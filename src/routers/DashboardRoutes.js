import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { AdminScreen } from '../components/admin/AdminScreen';
import { ChefScreen } from '../components/chef/ChefScreen';
import { Navbar } from '../components/ui/Navbar';
import { WaiterScreen } from '../components/waiter/WaiterScreen';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='waiter' element={<WaiterScreen />} />
        <Route path='chef' element={<ChefScreen />} />
        <Route path='admin' element={<AdminScreen />} />
        <Route path='/' element={<WaiterScreen />} />
      </Routes>
    </>
  )
} 