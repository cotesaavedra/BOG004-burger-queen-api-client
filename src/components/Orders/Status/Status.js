import React, { useContext } from 'react';
import { Apiurl } from '../../../services/apirest';
import axios from 'axios';
import { AuthContext } from '../../../auth/authContext';
import { toast } from 'react-toastify';

export const Status = ({ orders, setOrders, callOrders }) => {
    const { user } = useContext(AuthContext);
    let token = user.token;

    const changeToDelivered = (order) => {
        let id = order.id;
        let url = `${Apiurl}orders/${id}`;
        let data = '';
        if (order.status === 'pending') {
            data = {
                status: 'delivered'
            }
        } else if (order.status === 'delivered') {
            data = {
                status: 'pending'
            }
        }

        axios.patch(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                callOrders()
                toast.success('Cambio realizado!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <tbody>
            {orders.map((order) => {
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
                                <div data-testid='btn-status-pending' className='div-btn-status' onClick={(id) => changeToDelivered(order)}>
                                    <button className='status-pending'>Pendiente</button>
                                </div>
                            </td>
                        }
                        {order.status === 'delivered' &&
                            <td>
                                <div data-testid='btn-status-delivered' className='div-btn-status' onClick={(id) => changeToDelivered(order)}>
                                    <button className='status-delivered'>Entregado</button>
                                </div>
                            </td>
                        }
                    </tr>
                )
            })}
        </tbody>
    )
}
