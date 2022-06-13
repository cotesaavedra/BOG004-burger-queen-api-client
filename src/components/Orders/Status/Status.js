import React, { useContext, useState, } from 'react';
import { Apiurl } from '../../../services/apirest';
import axios from 'axios';
import { AuthContext } from '../../../auth/authContext';
import '../../waiter/WaiterScreen.js';



export const Status = ({ orders, setOrders }) => {
    const { user } = useContext(AuthContext);
    const [pendingOrder, setOrderSelected] = useState();
    // let url = Apiurl + 'orders' + '/'+ {order.id}'
    // console.log(url)
    let token = user.token;

    const changeToDelivered = (order) => {
        let url = Apiurl + 'orders';
        let data = {
            status: 'delivered'
        }
        axios.patch(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setOrders(response.data);
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
                        {order.products.map((product => {
                            return (<p key={product.product.id}>{product.product.name}</p>)
                        }))}
                    </td>

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
                                <button className='status-delivered' variant="primary" onClick={() => setOrderSelected(pendingOrder)}>Entregado</button>
                            </div>
                        </td>
                    }
                </tr>
            )
        })
    )
}
