import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { NavLeft } from '../ui/left/NavLeft';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authContext';
import { useEffect } from 'react';
import './ChefScreen.css';
import { StopWatch } from '../stopwatch/Stopwatch';



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
        <Col lg="8">
          <button className='comp-menu'>
            PendingOrders
          </button>

          <Accordion defaultActiveKey="0">
            <div>
              {orders.map((order, index) => (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <div>
                      <span className='order-head'>{order.dataEntry}</span>
                      <span className='order-head'>{order.client}</span>
                      <span className='order-head'>{order.status}</span>
                      <span className='stopwatch'><StopWatch /></span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Type</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product, index) => (
                          <tr>
                            <td>{index}</td>
                            <td><img src={product.product.image} alt={product.product.name} /></td>
                            <td>{product.product.type}</td>
                            <td>{product.product.name}</td>
                            <td>{product.qty}</td>
                            <td>{product.product.price}</td>
                          </tr>
                        )
                        )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </div>
          </Accordion>

          <div className='comp-menu'>
            <div className='btn-component' onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
            </div>
          </div>
        </Col>

      </Row>
    </>
  )

};