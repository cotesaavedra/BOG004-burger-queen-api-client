import { Accordion, Col, Row, Table } from 'react-bootstrap';
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
      <Row id='row-container'>
        <Accordion defaultActiveKey="0">
          <div>
            {orders.map((order, index) => (
              <Accordion.Item eventKey={index} key = {order.id}>
                <Accordion.Header>
                  <div>
                    <span className='order-head'>{order.dataEntry}</span>
                    <span className='order-head'>{order.client}</span>
                    <span className='order-head'>{order.status}</span>
                    <span className='stopwatch'><StopWatch /></span>
                  </div>
                </Accordion.Header>
                <PendingOrders orders={orders}></PendingOrders>
              </Accordion.Item>
            ))}
          </div>
        </Accordion>

        <div>
          <div className='btn-component' onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}>
          </div>
        </div>
      </Row>
    </>
  )

};