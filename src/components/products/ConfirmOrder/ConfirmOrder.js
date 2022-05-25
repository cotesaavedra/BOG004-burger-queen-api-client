import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCutlery } from '@fortawesome/free-solid-svg-icons';
import { Apiurl } from '../../../services/apirest';

const ConfirmOrder = ({ products, dataClient }) => {
    const { user } = useContext(AuthContext);
    const orderedProducts = [];
    products.forEach(product => {
        if (product.quantity > 0) {
            orderedProducts.push(
                {
                    qyt: product.quantity,
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
   
    const addToApi= () => {
        let url = Apiurl + 'orders';
        let token = user.token;
        let client = Object.values(dataClient).toString()
        const data = {
            userId: user.id,
            client: client,
            products: orderedProducts
        };
        axios.post(url, data, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
          })
    }
    return (
        <div className='btn-component'>
            <button className='global-btn' onClick={addToApi}><FontAwesomeIcon icon={faCutlery} /> Confirmar</button>
        </div>
    )
}

export default ConfirmOrder
