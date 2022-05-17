import './LoginScreen.css';
import logo from '../assest/logo.png';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { InputGroup, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';



export const LoginScreen = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [datos, setDatos] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event) => {

    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })

  }

  const enviarDatos = (event) => {
    event.preventDefault()
  }

  const login = () => {
    let data = { email: datos.email, password: datos.password };
    let url = Apiurl + 'login'
    axios.post(url, data)
      .then(response => {
        const { accessToken, user } = response.data;
        console.log('token:', accessToken, user);
        if (accessToken) {
          const action = {
            type: types.login,
            payload: user
          }
          dispatch(action);
          if(user.roles.waiter) {
            navigate('/waiter', {
              replace: true
            });
          } else if(user.roles.chef) {
            navigate('/chef', {
              replace: true
            });
          }
          else if (user.roles.admin){
            navigate('/admin', {
              replace: true
            });
          }
         
          console.log('Redireccionando a vista Mesero...')
        }
      })
      .catch(error => {
        console.log(datos.email, datos.password)
        console.log(error);
      })
  }

  return (
    <div id='cont-login'>
    <div className='container'>
      <div className='d-flex justify-content-center h-100'>
        <div className='card'>
          <div className='card-header'>
          <img id='logo' src={ logo } alt='logo' />
          </div>
          <div className='card-body'>
            <Form onSubmit={ enviarDatos }>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Email
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                    <FormControl type='text' className='form-control' name='email' placeholder='Email' onChange={handleInputChange} />
                  </InputGroup>
                </Col>
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Contraseña
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                    <FormControl type='password' className='form-control' name='password' placeholder='Password' onChange={handleInputChange} />
                  </InputGroup>
                </Col>
                <Col xs="auto">
                  <Button type='submit' variant="success" className='btn float-right login_btn' value='Login' onClick={login} >
                    Ingresar
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='card-footer'>
            <div className='d-flex justify-content-center links'>
              <a href='www.google.com'>¿No estás registrado?</a>
            </div>
            <div className='d-flex justify-content-center'>
              <a href='www.google.com'>Olvidé mi contraseña</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}



