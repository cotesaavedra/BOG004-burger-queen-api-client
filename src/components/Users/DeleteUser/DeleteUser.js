import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../auth/authContext';
import { Apiurl } from '../../../services/apirest';
import { Modal } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


export const DeleteUser = ({userToDelete, callUsers}) => {
  const { user } = useContext(AuthContext);
  const token = user.token;

  const url = `${Apiurl}users/${userToDelete.id}`;
  const [modalDelete, setmodalDelete] = useState(false);
  const handleClose = () => {
    setmodalDelete(false)
  };

  const handleShow = () => {
    setmodalDelete(true);
  };

  const handleDelete = () => {
    axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      toast.success('Se elimino con exito');
      setmodalDelete(false);
      callUsers();
    })
      .catch(error => {
        toast.error('Error al iniciar sesión');
      });
  };

  return (
    <>
      <FontAwesomeIcon icon={faTrash} onClick={handleShow} />
      <Modal show={modalDelete} onHide={handleClose}>
        <Modal.Body>
          <div>
            ¿Estás seguro que deseas eliminar a {userToDelete.email}?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='global-btn' onClick={handleDelete}>
            Sí
          </button>
          <button className='global-btn' onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );

}
