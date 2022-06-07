import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Ordered = ({ products, setProducts }) => {
    const remove = (e, product) => {
        let orderedClone = Object.assign([], products);
        orderedClone.forEach(element => {
            if (product.id === element.id) {
                element.quantity = 0; 
            }
        });
        setProducts(orderedClone);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product.id}>
                            {product.quantity > 0 &&
                                <>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price}</td>
                                    <td id={product.id+'Btn'} onClick={(e) => remove(e, product)}> <FontAwesomeIcon icon={faTrash} /></td>
                                </>
                            }
                        </tr>
                    )
                })
                }
            </tbody>
        </Table>
    )
}
export default Ordered
