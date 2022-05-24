import React from 'react'

export const AddInOrder = ({ products }) => {
    let addProduct = []
    products.forEach(product => {
        if (product.quantity > 0) {
            addProduct.push(product);
            // console.log('producto:', product.name)
            // console.log('cantidad:', product.quantity)
        }
    })
    console.log(addProduct);

    return (
        <h6>hola</h6>

    )
}
