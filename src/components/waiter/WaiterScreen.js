import './WaiterScreen.css';
import { Row, Col, Collapse} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { NavLeft } from '../ui/left/NavLeft';
import { AuthContext } from '../../auth/authContext';
import ProductCard from '../products/card/Products';
import NewOrder from '../orders/NewOrder';

export const WaiterScreen = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
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

  // console.log(products)
  return (
    <Row>
      <NavLeft>
        <div onClick={viewProduct}>
          <p><FontAwesomeIcon icon={faTh} /> Menú</p>
        </div>
        <div onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}>
          <p ><FontAwesomeIcon icon={faCutlery} /> Nueva Orden</p>
        </div>
      </NavLeft>
      <Col lg={10}>
        <h2>Menú</h2>
        <div className='products-container'>
          <ProductCard products={ products } setProducts={setProducts}></ProductCard>
          <Collapse in={open}>
                <div id="example-collapse-text">
                    {/* Nueva orden como componente */}
                    Nueva orden
                    <NewOrder products={ products }/>
                </div>
            </Collapse>
        </div>
      </Col>

    </Row>
  )
}