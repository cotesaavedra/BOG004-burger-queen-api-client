import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Apiurl } from '../../../services/apirest';
import axios from 'axios';
import { AuthContext } from '../../../auth/authContext';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export const EditUser = ({ userToEdit, callUsers }) => {
  const { user } = useContext(AuthContext);
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const url = `${Apiurl}users/${userToEdit.id}`;
  const token = user.token;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleUpdate = (info) => {
    setShow(true);
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

    axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        toast.success('Cambio realizado!');
        setShow(false);
        callUsers()
      })
      .catch(error => {
        toast.error('Error al actualizar!');
      });
  };

  useEffect(() => {
    let email = userToEdit.email;
    let rol = Object.keys(userToEdit.roles).toString();
    setValue('email', email); //Cada userToEdit cambia se actualizará el valor del input de la modal. setValue viene de react hook form
    setValue('rol', rol);
  }, [userToEdit.email, userToEdit.roles, setValue]);
  return (
    <>
      <FontAwesomeIcon data-testid='icon-edit' icon={faPencil} onClick={handleShow} />
      <Modal data-testid='modal' show={show} onHide={handleClose}>
        <form data-testid='form' onSubmit={handleSubmit((data) => handleUpdate(data))}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label >Email</Form.Label>
              <Form.Control
              data-testid='email'
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
            <button className='global-btn btn-cancel' onClick={handleClose}> Cancelar</button>
            <button data-testid='submit' className='global-btn' type='submit'><FontAwesomeIcon icon={faCheck} /> Actualizar</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

