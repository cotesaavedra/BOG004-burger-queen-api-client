import { Row, Col } from 'react-bootstrap';
import { NavLeft } from '../ui/left/NavLeft';
import React, { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { useEffect } from 'react';
import './ChefScreen.css';
import { StopWatch } from '../stopwatch/Stopwatch';
import ProductCard from '../products/card/ProductsCard';

export const ChefScreen = () => {
  const { user } = useContext(AuthContext);

  const pendingOrder = () => {
    const orderWaiter = () => {
      

    }

    fetch('http://localhost:8080/orders', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + user.token,
      }
    });

  }

  return (
    <>
        <div id='btn-chef'>
          <button type='submit' className='btn-order'>Enviar Waiter</button>
        </div>
        <StopWatch />
      <div>
        
      </div>

    </>
  )
};