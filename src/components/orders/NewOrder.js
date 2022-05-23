import { InputGroup, Form, FormControl, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddInOrder } from '../products/AddInOrder/AddInOrder';

const NewOrder = ({ products }) => {
    const { handleSubmit } = useForm();

    const [newOrder, setNewOrder] = useState({
        "userId": 15254,
        "client": "Carol Shaw",
        "products": [
            {
                "qty": 5,
                "product": {
                    "id": 1214,
                    "name": "Sandwich de jamón y queso",
                    "price": 1000,
                    "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg",
                    "type": "Desayuno",
                    "dateEntry": "2022-03-05 15:14:10"
                }
            }
        ]
    })
    const [dataClient, setDataClient] = useState('')

    const handleInputChange = (event) => {
        setDataClient({
            ...dataClient,
            [event.target.name]: event.target.value
        })

    }
    const removeSubmit = (event) => {
        event.preventDefault()
    }
    // dataClient es el nombre del cliente console.log(dataClient)
    return (
        <Form onSubmit={handleSubmit(removeSubmit)}>
            <Col xs="auto">
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Cliente
                </Form.Label>
                <InputGroup className="mb-2">
                    <FormControl type='text' className='form-control' name='Cliente' placeholder='Cliente' onChange={handleInputChange} />
                </InputGroup>
            </Col>
            <Col xs='auto'>
                {newOrder.products.map(({product, qty}) =>
                    <div key={product.id}>
                        <h6>{product.name}</h6>
                        <p>{qty}</p>

                    </div>
                )
                }
            </Col>
        </Form >
    )
}
export default NewOrder;