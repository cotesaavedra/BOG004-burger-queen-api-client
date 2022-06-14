import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCutlery, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Apiurl } from '../../../services/apirest';
import { Spinner } from 'react-bootstrap';

const ConfirmOrder = ({ products, setProducts, dataClient }) => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState('wait');
    let url = Apiurl + 'orders';
    let token = user.token;
    let client = Object.values(dataClient).toString();
    let date = new Date();
    let days = date.toISOString().split('T')[0];
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if (hours.length === 1) {
        hours = "0" + hours;
    } else if (minutes.length === 1) {
        minutes = "0" + minutes;
    }
    let dataEntry = `${days} ${hours}:${minutes}`

    const orderedProducts = [];
    products.forEach(product => {
        if (product.quantity > 0) {
            orderedProducts.push(
                {
                    qty: product.quantity,
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        type: product.type,
                        dateEntry: product.dateEntry,
                    }
                }
            )
        }
    });

    const addToApi = () => {

        const data = {
            userId: user.id,
            client: client,
            products: orderedProducts,
            status: 'pending',
            dataEntry: dataEntry
        };
        axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setStatus('send');
                setTimeout(() => {
                    setStatus('created');
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }, 1000);

            })
            .catch(error => {
                setStatus('rejected');
            })
    }
    return (
        <div className='btn-component'>
            {status === 'wait' &&
                <>
                    <button data-testid='btn-confirm' className='global-btn' onClick={addToApi}><FontAwesomeIcon icon={faCutlery} /> Confirmar</button>
                </>
            }
            {status === 'send' &&
                <>
                    <button className='global-btn' data-testid='btn-send'>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> Enviando cocina...
                    </button>
                </>
            }
            {status === 'created' &&
                <>
                    <button className='global-btn' data-testid='btn-created'><FontAwesomeIcon icon={faCheck} /> Orden enviada</button>
                </>
            }
            {status === 'rejected' &&
                <>
                    <button className='global-btn btn-rejected'><FontAwesomeIcon icon={faCheck} /> Error al enviar</button>
                </>
            }
        </div>
    )
}

export default ConfirmOrder
