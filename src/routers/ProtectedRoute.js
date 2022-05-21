import React from 'react'
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';


export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login#notallowed', //Cambiar la redireccion a una vista de mensaje de error
  children,
}) => {
  const { dispatch } = useContext(AuthContext);
  if (!isAllowed) {
    const action = {
      type: types.logout,
    }
    dispatch(action);
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
