import { Col } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authContext';
import { useEffect } from 'react';
import './ChefScreen.css';
import '../pendingOrders/PendingOrders.css'
import { StopWatch } from '../stopwatch/Stopwatch';
import PendingOrders from '../pendingOrders/PendingOrders';

export const ChefScreen = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [OrderSelected, setOrderSelected] = useState();
  const [open, setOpen] = useState(false);

  const getOrders = () => {
    fetch('http://localhost:8080/orders', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + user.token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data === 'object' && data.length > 0) {
          console.log(data);
          setOrders(data);
        }
      });
  };

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
      <Col log={2}>
        {orders.map((order, index) => (
          <div>
            <span className='order-head'>{order.dataEntry}</span>
            <span className='order-head'>{order.client}</span>
            <span className='order-head'>{order.status}</span>
            <span className='stopwatch'><StopWatch /></span>
            <button className='btn-component' onClick={() => setOpen(!open) = OrderSelected(!setOrderSelected)} >
              Show more
            </button>
          </div>
        ))}
      </Col>
      <Col log={10}>
          <PendingOrders  />
      </Col>
    </>
  )

};