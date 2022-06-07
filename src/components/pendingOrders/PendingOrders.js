import './PendingOrders.css';
import React from 'react';
import { Table, } from 'react-bootstrap';

const PendingOrders = ({ order }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((product, index) => (
          <tr key={product.id}>
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
  )
}

export default PendingOrders;
