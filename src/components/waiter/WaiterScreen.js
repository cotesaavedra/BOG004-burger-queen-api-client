import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { NavLeft } from '../NavLeft';

export const WaiterScreen = () => {
  const [products, setProducts] = useState([]);
  const viewProduct = () => {
    fetch('http://localhost:8080/products', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MjU2MTk0OSwiZXhwIjoxNjUyNTY1NTQ5LCJzdWIiOiIyIn0.jKBJA5VQqnBI1a4FoBfQyIS7BjXJ_f0gYScjw3qsC-4'
      }
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        // console.log(data)
      });
  }

  return (
    <Row>
      <NavLeft nombre='diego'>
        <h1>hola</h1>
        <h1>jeje</h1>
        <Button variant="outline-success" onClick={viewProduct}>Menú</Button>
      </NavLeft>
      <Col lg={9}>
        <h1>WaiterScreen</h1>
        {/* <p>{products}</p> */}
        {products.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}

      </Col>

    </Row>
  )
}