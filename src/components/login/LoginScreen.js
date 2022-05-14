import './LoginScreen.css';
import Logo from '../assest/logo.png';
import { useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';

export const LoginScreen = () => {
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
        const { accessToken } = response.data;
        console.log('token:', accessToken);
        if (accessToken) {
          console.log('Redireccionando a vista Mesero...')
        }
      })
      .catch(error => {
        console.log(datos.email, datos.password)
        console.log(error);
      })
  }

  return (
    <div className='wrapper fadeInDown'>
      <div id='formContent'>
        <div className='fadeIn first'>
          <img src={ Logo } id='icon' alt='User Icon' />
        </div>
        <form onSubmit={ enviarDatos }>
          <input type='text' className='fadeIn second' name='email' placeholder='email' onChange={handleInputChange} />
          <input type='password' className='fadeIn third' name='password' placeholder='password' onChange={handleInputChange} />
          <input type='submit' className='fadeIn fourth' value='Log In' onClick={login} />
        </form>
      </div>
    </div>
  );


}