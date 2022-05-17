import './WaiterScreen.css';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { NavLeft } from '../nav.js/NavLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faCutlery } from '@fortawesome/free-solid-svg-icons';


export const WaiterScreen = () => {

  const [products, setProducts] = useState([]);
  const viewProduct = () => {
    fetch('http://localhost:8080/products', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MjgyMjI4MCwiZXhwIjoxNjUyODI1ODgwLCJzdWIiOiIyIn0.EZihTCXmhHqIUCb3V2djbZCdSajJG4AOmdEFfi1BVHo',
      }
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data === 'object' && data.length > 0) {
          setProducts(data);
        }
      });
  }
  return (
    <Row>
      <NavLeft>
        <div onClick={viewProduct}>
          <p><FontAwesomeIcon icon={faTh} /> Menú</p>
        </div>
        <div onClick={viewProduct}>
          <p><FontAwesomeIcon icon={faCutlery} /> Nueva Orden</p>
        </div>
      </NavLeft>
      <Col lg={10}>
        <h2>Menú</h2>
        {/* <p>{products}</p> */}
        <div className='products-container'>
          {products.map((product) => (
            <div className='product'>
              <h6 key={product.id + 'name'}>{product.name}</h6>
              <p key={product.id + 'price'}>Precio: ${product.price}</p>
            </div>
        ))}
        </div>
      </Col>

    </Row>
  )
}