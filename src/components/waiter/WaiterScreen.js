import './WaiterScreen.css';
import { Row, Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { NavLeft } from '../ui/left/NavLeft';
import { AuthContext } from '../../auth/authContext';
import ProductCard from '../products/card/Products';

export const WaiterScreen = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const viewProduct = () => {
    fetch('http://localhost:8080/products', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + user.token,
      }
    })
      .then(response => response.json())
      .then(data => {
        data.forEach((product) => {
          product.quantity = 0;
        })
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
          <ProductCard products={ products } setProducts={setProducts}></ProductCard>
          {/* {products.map((product) => (
            <div className='product'>
              <h6 key={product.id + 'name'}>{product.name}</h6>
              <p key={product.id + 'price'}>Precio: ${product.price}</p>
            </div>
          ))} */}
        </div>
      </Col>

    </Row>
  )
}