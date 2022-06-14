import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Apiurl } from '../../../services/apirest';
import axios from 'axios';
import { AuthContext } from '../../../auth/authContext';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export const EditProducts = ({productToEdit, callProducts}) => {
  const { user } = useContext(AuthContext);
  const { register, setValue, handleSubmit } = useForm();
  const url = `${Apiurl}products/${productToEdit.id}`;
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

    const data = {
      'name': info.name,
      'price': info.price,
      'image': info.image,
      'type': info.type
    }

    axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        toast.success('Cambio realizado!');
        setShow(false);
        callProducts()
      })
      .catch(error => {
        toast.error('Error al actualizar!');
      });
  };
  useEffect(() => {
    let name = productToEdit.name;
    let price = productToEdit.price;
    let image = productToEdit.image;
    let type = productToEdit.type;
    setValue('name', name); //Cada userToEdit cambia se actualizará el valor del input de la modal. setValue viene de react hook form
    setValue('price', price);
    setValue('image', image);
    setValue('type', type);
  }, [productToEdit.name, productToEdit.price, productToEdit.image, productToEdit.type, setValue]);

  return (
    <>
      <FontAwesomeIcon data-testid='icon-edit' icon={faPencil} onClick={handleShow} />
      <Modal data-testid='modal' show={show} onHide={handleClose}>
        <form data-testid='form' onSubmit={handleSubmit((data) => handleUpdate(data))}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                data-testid='name'
                type='text'
                name='name'
                autoFocus
                {...register('name', {
                  required: {
                    value: true,
                    message: 'El email es requerido'
                  }
                })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type='text'
                name='price'
                {...register('price', {
                  required: {
                    value: true,
                    message: 'El email es requerido'
                  }
                })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type='text'
                name='image'
                placeholder='inserte la URL'
                autoFocus
                required
                {...register('image', {
                  required: {
                    value: true,
                    message: 'El email es requerido'
                  }
                })}
              />
            </Form.Group>
            <Form.Check
              inline
              label='Desayuno'
              name='type'
              type='radio'
              value='Desayuno'
              id='inline-type-1'
              {...register('type', {})}
            />
            <Form.Check
              inline
              label='Almuerzo'
              name='type'
              type='radio'
              value='Almuerzo'
              id='inline-type-2'
              {...register('type', {})}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className='global-btn btn-cancel' type='reset' onClick={handleClose}>Cancelar</button>
            <button className='global-btn btn-confirm' type='submit'>Crear</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
