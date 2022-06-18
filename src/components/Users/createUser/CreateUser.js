import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../auth/authContext';
import { Apiurl } from '../../../services/apirest';

export const CreateUser = ({ callUsers }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalCreateUser, setmodalcreate] = useState(false);
  const { user } = useContext(AuthContext);
  const url = `${Apiurl}users/`;
  const token = user.token;

  const handleCreate = () => {
    setmodalcreate(true);
  };
  const closeForm = () => {
    setmodalcreate(false);
  }

  const userCreaterForm = (info) => {
    setmodalcreate(true);
    let rol = {};
    if (info.rol === 'admin') {
      rol = { 'admin': true }
    } else if (info.rol === 'waiter') {
      rol = { 'waiter': true }
    } else if (info.rol === 'chef') {
      rol = { 'chef': true }
    }
    const data = {
      'email': info.email,
      'password': info.password,
      'roles': rol
    }
    axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      toast.success('Se Creo el Usuario con exito');
      setmodalcreate(false);
      callUsers();
    }).catch(error => {
      toast.error('Error el usuario no fue creado');
    });
  };


  return (
    <>

      <button className='global-btn' onClick={handleCreate} > Nuevo Trabajador</button>
      <Modal show={modalCreateUser} onHide={closeForm}>
        <form className='form-user' onSubmit={handleSubmit((data) => userCreaterForm(data))}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='name@systers.xyz'
                autoFocus
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
              />
              {errors.email && <p className='error-message'>{errors.email.message}</p>}
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
              <Form.Label>Rol</Form.Label>
              <Form.Select
                aria-label='Default select example'
                name='rol'
                {...register('rol', {
                })}>
                <option>Seleccione una opción</option>
                <option value='admin'>Administrador</option>
                <option value='waiter'>Mesero</option>
                <option value='chef'>Chef</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='6 caracteres mínimo'
                autoFocus
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
              />
              {errors.password && <p className='error-message'>{errors.password.message}</p>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className='global-btn btn-cancel' onClick={closeForm}> Cancelar</button>
            <button className='global-btn' type='submit'><FontAwesomeIcon icon={faCheck} /> Crear Usuario</button>
          </Modal.Footer>

        </form>
      </Modal>


    </>
  )
};
