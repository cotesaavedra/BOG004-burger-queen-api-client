import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { Apiurl } from '../../../services/apirest';

const ReadyOrders = () => {
    const { user } = useContext(AuthContext);

    const viewOrders = () => {
        let url = Apiurl + 'orders';
        let token = user.token;
        axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
               console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
  return (
    
  )
}
export default ReadyOrders

