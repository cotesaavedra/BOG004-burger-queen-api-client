import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { Apiurl } from '../../../services/apirest';
import { AuthContext } from '../../../auth/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const DeleteProducts = ({ product, callProducts }) => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  let url = `${Apiurl}products/${product.id}`;
  let token = user.token;
  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleDelete = () => {
    axios.delete(url, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then(response => {
        toast.success(`${product.name} eliminado`);
        callProducts()
      })
      .catch(error => {
          toast.error('Error al eliminar');
      })
    setShow(true);
  }
  return (
    <>
      <FontAwesomeIcon data-testid='icon-delete' icon={faTrash} onClick={handleShow} />
      <Modal data-testid='modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminando producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Está seguro que quiere eliminar "{product.name}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='global-btn btn-cancel' onClick={handleClose}>Cancelar</button>
          <button className='global-btn btn-confirm' onClick={handleDelete}>Eliminar</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
