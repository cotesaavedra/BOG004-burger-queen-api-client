import React from 'react'
import { Table } from 'react-bootstrap'

export const DetailOrder = ({ order }) => {

  return (
    <div className='p-2'>
      <h3>Detalle De La Orden: {order && order.id}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nº</th>
            <th>tipo</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {order && order.products.map((product, index) => (
            <tr key={product.product.id}>
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
    </div>
  )
}
