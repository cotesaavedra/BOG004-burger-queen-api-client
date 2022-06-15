import React, { useContext, useState } from 'react'
import { Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../auth/authContext';
import axios from 'axios';
import { Apiurl } from '../../../services/apirest';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export const AddProduct = ({callProducts}) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    let url = Apiurl + 'products';
    let token = user.token;
    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setShow(true);
    };
    const handleAdd = (info) => {
        const newProduct = {
            'name': info.name,
            'price': info.price,
            'image': info.image,
            'type': info.type
        }
        axios.post(url, newProduct, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setShow(false);
                toast.success('Producto agregado con éxito');
                callProducts()
            })
            .catch(error => {
                toast.error('Error al eliminar');
            })
    }
    return (
        <>
            <button className='global-btn' onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Nuevo Producto</button>
            <Modal data-testid='modal' show={show} onHide={handleClose}>
                <form data-testid='form' onSubmit={handleSubmit(handleAdd)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                            <Form.Label >Nombre</Form.Label>
                            <Form.Control
                                data-testid='name'
                                type='text'
                                name='name'
                                autoFocus
                                required
                                {...register('name', {})}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type='text'
                                name='price'
                                required
                                {...register('price', {})}
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
                                {...register('image', {})}
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
    )

}
