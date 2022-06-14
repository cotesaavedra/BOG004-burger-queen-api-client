import './AdminScreen.css';
import { Row, Col } from 'react-bootstrap';
import { useContext, useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavLeft from '../ui/left/NavLeft';
import { Apiurl } from '../../services/apirest';
import { AuthContext } from '../../auth/authContext';
import axios from 'axios';
import { ViewUsers } from '../Users/ViewUsers/ViewUsers';


export const AdminScreen = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  let url = Apiurl + 'users';
  let token = user.token;

  const callUsers = useCallback(
    () => {
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setUsers(response.data)
        })
        .catch(error => {
          console.log('rejected');
        })
    },
    [url, token],
  );

  useEffect(() => {
    callUsers();
  }, [callUsers])

  return (

    <Row id='row-container'>
      <NavLeft>
        <div data-testid='btn-employees' className='comp-menu' id='menu-active'>
          <p><FontAwesomeIcon icon={faBars} /> Empleados</p>
        </div>
        <Link to='/admin/products'>
          <div className='comp-menu'>
            <p data-testid='orders-ready'><FontAwesomeIcon icon={faCheck} /> Productos</p>
          </div>
        </Link>
        <div rol='button' >
          <div className='btn-component' onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}>
            <button className='global-btn'><FontAwesomeIcon icon={faPlus} /> Nuevo Trabajador</button>
          </div>
        </div>
      </NavLeft>
      <Col lg={10}>
        <ViewUsers users={users} setUsers={setUsers} callUsers={callUsers} />
      </Col>
    </Row>
  )
}