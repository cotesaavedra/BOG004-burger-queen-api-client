import React, { useState, useContext, useEffect, useCallback } from 'react'
import axios from 'axios';
import { Apiurl } from '../../../services/apirest';
import { AuthContext } from '../../../auth/authContext';
import { Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBars } from '@fortawesome/free-solid-svg-icons';
import NavLeft from '../../ui/left/NavLeft';
import { Link } from 'react-router-dom';
import './OrdersScreen.css'
import { Status } from '../Status/Status';

export const OrdersScreen = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  let url = Apiurl + 'orders';
  let token = user.token;

  const callOrders = useCallback(
    () => {
      setLoading(true);
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error)
        });
    },
    [token, url],
  );
  useEffect(() => {
    callOrders()
  }, [callOrders])


  return (
    <Row id='row-container'>
      <NavLeft>
        <Link to='/waiter'>
          <div className='comp-menu'>
            <p><FontAwesomeIcon icon={faBars} /> Menú</p>
          </div>
        </Link>
        <Link to='/waiter/orders'>
          <div className='comp-menu' id='orders-active'>
            <p><FontAwesomeIcon icon={faCheck} /> Ordenes listas</p>
          </div>
        </Link>
      </NavLeft>
      <Col lg={10}>
        {loading ? '' : (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Cliente</th>
                <th>Detalle</th>
                <th>Ingreso</th>
                <th>Estado</th>
              </tr>
            </thead>
            {/* <tbody> */}
              <Status orders={orders} setOrders={setOrders} callOrders={callOrders}></Status>
            {/* </tbody> */}
          </Table>
        )}
      </Col>
    </Row>
  )
}

