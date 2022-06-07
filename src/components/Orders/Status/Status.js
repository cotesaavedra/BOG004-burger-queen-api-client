import React, { useContext } from 'react';
import { Apiurl } from '../../../services/apirest';
import axios from 'axios';
import { AuthContext } from '../../../auth/authContext';



export const Status = ({ orders, setOrders, callOrders }) => {
    const { user } = useContext(AuthContext);
    // console.log(url)
    let token = user.token;
    
    const changeToDelivered = (order) => {
            let id = order.id;
            let url = `${Apiurl}orders/${id}`;
            let data = {
                status: 'delivered'
            }
            
            axios.patch(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    callOrders()
                })
                .catch(error => {
                    console.log(error)
                });
    }

    return (
        orders.map((order) => {
            return (
                <tr key={order.id} className='order'>
                    <td>{order.id}</td>
                    <td>{order.client}</td>
                    <td>
                        {order.products.map((element => {
                            return (
                            <p key={element.product.id}>{element.qty} x {element.product.name}</p>
                            )
                        }))}
                    </td>
                    <td>{order.dataEntry}</td>

                    {order.status === 'pending' &&
                        <td>
                            <div className='div-btn-status' onClick={(id) => changeToDelivered(order)}>
                                <button className='status-pending'>Pendiente</button>
                            </div>
                        </td>
                    }
                    {order.status === 'delivered' &&
                        <td>
                            <div className='div-btn-status'>
                                <button className='status-delivered'>Entregado</button>
                            </div>
                        </td>
                    }
                </tr>
            )
        })
    )
}
