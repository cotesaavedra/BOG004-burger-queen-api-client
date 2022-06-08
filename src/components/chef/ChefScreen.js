import { Row, Col } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authContext';
import { useEffect } from 'react';
import './ChefScreen.css';
import PendingOrder from '../pendingOrder/PendingOrder';
import { DetailOrder } from '../detailOrder/DetailOrder';

export const ChefScreen = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState();


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
    <Row id='row-container'>
      <Col lg={6}>
        {orders.map((order) => (
          <PendingOrder key={order.id} order={order} setOrderSelected={setOrderSelected} />
        ))}
      </Col>
      <Col lg={6}>
        <DetailOrder order={orderSelected} />
      </Col>
    </Row>
  )

};