import './WaiterScreen.css';
import { Row, Col, Collapse } from 'react-bootstrap';
import { useContext, useState, useEffect, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCutlery, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../auth/authContext';
import NewOrder from '../products/NewOrder/NewOrder';
import Card from '../products/card/Card';
import NavLeft  from '../ui/left/NavLeft';
import { Link } from 'react-router-dom';

export const WaiterScreen = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const callProducts = useCallback(
    () => {
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
    },
    [user],
  );
  
  useEffect(() => {
    callProducts();
  }, [callProducts])

  return (
    <Row id='row-container'>
      <NavLeft>
        <div data-testid='btn-fetch' className='comp-menu' id='menu-active'>
          <p><FontAwesomeIcon icon={faBars} /> Menú</p>
        </div>
        <Link to='/waiter/orders'>
        <div className='comp-menu'>
          <p data-testid='orders-ready'><FontAwesomeIcon icon={faCheck} /> Ordenes listas</p>
        </div>
        </Link>
        <div rol='button' >
          <div className='btn-component' onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}>
            <button className='global-btn'><FontAwesomeIcon icon={faCutlery} /> Nueva Orden</button>
          </div>
        </div>
      </NavLeft>
      <Col lg={10}>
        <div id='title-menu' data-testid='btn-row'>
          <h2>Menú</h2>
          <hr className="solid"></hr>
        </div>
        <div className='products-container'>
          <Col lg={7} id='column-product'>
            <Card products={products} setProducts={setProducts}></Card>
          </Col>
          <Col lg={5}>
            <Collapse id='nav-collapse' in={open}>
              <div data-testid='collapse-div' id="example-collapse-text">
                <h5 className='comp-padding collapse-h5'>Nueva orden</h5>
                <p className='comp-padding'>usuario: {user.email}</p>
                <NewOrder products={products} setProducts={setProducts} />
              </div>
            </Collapse>
          </Col>
        </div>
      </Col>
    </Row>
  )
}
