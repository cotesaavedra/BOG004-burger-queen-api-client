import React from 'react';
import './TotalPay.css'

const TotalPay = ({ products }) => {
    let total = 0;
    products.forEach(product => {
        total += product.quantity * product.price
    })
    return (
        <>
            <div id='order-breakdown'>
                <div className='order-element'>
                    <h6>Subtotal:</h6>
                    <h6>${total}</h6>
                </div>
                <hr className="solid"></hr>
                <div className='order-element'>
                    <h6>Propina 10%:</h6>
                    <h6>${total * 0.1}</h6>
                </div>
            </div>
            <div id='order-total'>
                <div className='order-element'>
                    <h5>Total:</h5>
                    <h5>${total + total * 0.1}</h5>
                </div>
            </div>
        </>
    )
}
export default TotalPay