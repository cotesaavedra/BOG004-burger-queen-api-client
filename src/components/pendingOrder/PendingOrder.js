import './PendingOrder.css';
import React, { useEffect, useState } from 'react';
import { StopWatch } from '../stopwatch/Stopwatch';
import { Card, } from 'react-bootstrap';


const PendingOrder = ({ order, setOrderSelected, getOrders}) => {
  const [pendingOrder, setPendingOrder] = useState(order);
  useEffect(() => {
   
    setPendingOrder(order);
  }, [order])

  return (
    <Card>
      <Card.Header >
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Order {order.id}</h5>
          <span >
            Status: <span className={pendingOrder.status === 'pending' ? 'status-pending p-2' : 'status-delivered p-2'}>{pendingOrder.status}</span>
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          <div>Date entry: {pendingOrder.dataEntry}</div>
          {pendingOrder.status === 'delivered' && <div>Date processed: {pendingOrder.dateProcessed}</div>}
          <div>Client: {pendingOrder.client}</div>

        </div>
        <div className={pendingOrder.status === 'pending' ? 'd-flex justify-content-between align-items-center' : 'd-flex justify-content-end align-items-center'}>
          {pendingOrder.status === 'pending' && <StopWatch order={pendingOrder} getOrders={getOrders} />}
          <button data-testid ='btn-show-detail' className='global-btn' onClick={() => setOrderSelected(pendingOrder)}>Ver Detalle</button>
        </div>

      </Card.Body>
    </Card>
  )
}

export default PendingOrder;
