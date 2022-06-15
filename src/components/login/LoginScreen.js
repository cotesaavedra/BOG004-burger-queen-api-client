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
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const LoginScreen = () => {
  const { register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [dataUser, setdataUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event) => {
    setdataUser({
      ...dataUser,
      [event.target.name]: event.target.value
    })
  }

  const toAccess = () => {
    let data = { email: dataUser.email, password: dataUser.password };
    let url = Apiurl + 'login';
    axios.post(url, data)
      .then(response => {
        const { accessToken, user } = response.data;
        if (accessToken) {
          const action = {
            type: types.login,
            payload: { ...user, token: accessToken }
          }
          dispatch(action);
          if (user.roles.waiter) {
            navigate('/waiter', {
              replace: true
            });
          } else if (user.roles.chef) {
            navigate('/chef', {
              replace: true
            });
          }
          else if (user.roles.admin) {
            navigate('/admin', {
              replace: true
            });
          }
        }
      })
      .catch(error => {
        toast.error('Usuario o/y Contraseña Incorrecta');
      })
  }

  return (
    <div id='cont-login'>
      <div className='container'>
        <div className='d-flex justify-content-center h-100'>
          <div className='card-login'>
            <div className='card-login-header'>
              <img id='logo' src={logo} alt='logo' />
            </div>
            <div className='card-login-body'>
              <Form onSubmit={(event) => {
                event.preventDefault()
              }}>
                {window.location.hash === '#notallowed' &&
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <p>Usted no tiene permisos</p>
                    </Col>
                  </Row>
                }
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                      Email
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <FormControl
                        type='text'
                        className='form-control'
                        name='email'
                        placeholder='Email'
                        {...register('email', {
                          required: {
                            value: true,
                            message: 'El email es requerido'
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'El formato no es correcto'
                          }
                        })}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                    <InputGroup>
                      {errors.email && <p className='error-message'>{errors.email.message}</p>}
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
                      <FormControl
                        type='password'
                        className='form-control'
                        name='password'
                        placeholder='Password'
                        {...register('password', {
                          required: {
                            value: true,
                            message: 'La contraseña es requerida'
                          },
                          minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                          }
                        })}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                    <InputGroup>
                      {errors.password && <p className='error-message'>{errors.password.message}</p>}
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <Button type='submit' variant="success" className='btn float-right login_btn' value='Login' onClick={toAccess} >
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
