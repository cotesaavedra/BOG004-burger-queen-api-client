import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../auth/authContext';
import axios from 'axios';
import { Apiurl } from '../../../services/apirest';
import { toast } from 'react-toastify';
import { DeleteProducts } from '../DeleteProducts/DeleteProducts';
import { EditProducts } from '../EditProducts/EditProducts';
import NavLeft from '../../ui/left/NavLeft';
import { AddProduct } from '../AddProduct/AddProduct';

export const ViewProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    let url = Apiurl + 'products';
    let token = user.token;

    const callProducts = useCallback(
        () => {
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => {
                    toast.error('Error de conexión!');
                })
        },
        [url, token],
    );

    useEffect(() => {
        callProducts();
    }, [callProducts])

    return (
        <Row id='row-container'>
            <NavLeft>
                <Link to='/admin'>
                <div data-testid='btn-employees' className='comp-menu'>
                    <p><FontAwesomeIcon icon={faBars} /> Empleados</p>
                </div>
                </Link>
                    <div className='comp-menu' id='menu-active'>
                        <p data-testid='orders-ready'><FontAwesomeIcon icon={faCheck} /> Productos</p>
                    </div>
                <div rol='button' >
                    <div className='btn-component' onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                        <AddProduct callProducts={callProducts}></AddProduct>
                    </div>
                </div>
            </NavLeft>
            <Col lg={10}>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.id} className='viewProduct'>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.type}</td>
                                    <td><EditProducts productToEdit={product} callProducts={callProducts} /></td>
                                    <td><DeleteProducts product={product} callProducts={callProducts} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}