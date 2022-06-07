import './PendingOrders.css';
import React from 'react';
import { Accordion, Table, } from 'react-bootstrap';



const PendingOrders = ({ orders }) => {
  return (
    orders.map((order, index) => {
      return(
      <Accordion.Item eventKey={index} key = {order.id}>
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
                <tr key = {product.id}>
                  <td>{index}</td>
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
      )
    })
  )

}

export default PendingOrders;
