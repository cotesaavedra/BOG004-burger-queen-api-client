import './LoginScreen.css';
// import Logo from '../assest/logo.png';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';


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
          navigate('/', {
            replace: true
          });
          console.log('Redireccionando a vista Mesero...')
        }
      })
      .catch(error => {
        console.log(datos.email, datos.password)
        console.log(error);
      })
  }

  return (
    <div className='container'>
    <div className='d-flex justify-content-center h-100'>
      <div className='card'>
        <div className='card-header'>
          <h3>Sign In</h3>
        </div>
        <div className='card-body'>
          <form onSubmit={enviarDatos}>
            <div className='input-group form-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'><i className='fas fa-user'></i></span>
              </div>
              <input type='text' className='form-control' name='email' placeholder='Email' onChange={handleInputChange} />              
            </div>
            <div className='input-group form-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'><i className='fas fa-key'></i></span>
              </div>
              <input type='password' className='form-control' name='password' placeholder='Password' onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <input type='submit' className='btn float-right login_btn' value='Login' onClick={login} />
            </div>
          </form>
        </div>
        <div className='card-footer'>
          <div className='d-flex justify-content-center links'>
            Don't have an account?<a href='www.google.com'>Sign Up</a>
          </div>
          <div className='d-flex justify-content-center'>
            <a href='www.google.com'>Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}



