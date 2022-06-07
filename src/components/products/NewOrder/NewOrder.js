import { InputGroup, Form, FormControl, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Ordered from '../Ordered/Ordered';
import './NewOrder.css'
import TotalPay from '../TotalPay/TotalPay';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';


const NewOrder = ({ products, setProducts }) => {
    const [dataClient, setDataClient] = useState('')

    const removeSubmit = () => {
        return false
    }

    const handleInputChange = (event) => {
        setDataClient({
            ...dataClient,
            [event.target.name]: event.target.value
        })
    }

    let total = 0;
    products.forEach(product => {
        total += product.quantity * product.price
    });

    const { handleSubmit } = useForm();
    
    return (
        <Form data-testid='form' onSubmit={handleSubmit(removeSubmit)}>
            <Col xs="auto" className='comp-padding'>
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Cliente
                </Form.Label>
                <InputGroup className="mb-2">
                    <FormControl data-testid='name-client' type='text' className='form-control' name='Cliente' placeholder='Cliente' onChange={handleInputChange} />
                </InputGroup>
                <Ordered products={products} setProducts={setProducts} />
            </Col>
            {total > 0 &&
            <Col>
                <TotalPay products={products} />
                <ConfirmOrder products={products} setProducts={setProducts} dataClient={dataClient}/>
            </Col>
            }
        </Form >
    )
}
export default NewOrder;
