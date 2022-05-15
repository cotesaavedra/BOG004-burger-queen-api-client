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
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MjQ4OTU4OSwiZXhwIjoxNjUyNDkzMTg5LCJzdWIiOiIyIn0.q9RMdGYeZiOjjwanJ1tBZnMdWE5aC5ZgjaMHvu5BTrg'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data === 'object' && data.length > 0){
           setProducts(data);
        }
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