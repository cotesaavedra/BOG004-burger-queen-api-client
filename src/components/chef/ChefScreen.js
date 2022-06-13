import { Row, Col } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authContext';
import { useEffect } from 'react';
import './ChefScreen.css';
import PendingOrder from '../pendingOrder/PendingOrder';
import { DetailOrder } from '../detailOrder/DetailOrder';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';

export const ChefScreen = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState();


  const getOrders = () => {
    let url = Apiurl + 'orders';
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(({ data }) => {
        if (typeof data === 'object' && data.length > 0) {
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
          <PendingOrder key={order.id} order={order} setOrderSelected={setOrderSelected} getOrders={getOrders}/>
        ))}
      </Col>
      <Col lg={6}>
        <DetailOrder order={orderSelected} />
      </Col>
    </Row>
  )

};