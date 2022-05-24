import { InputGroup, Form, FormControl, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCutlery } from '@fortawesome/free-solid-svg-icons';
import Ordered from '../Ordered/Ordered';
import './NewOrder.css'
import TotalPay from '../TotalPay/TotalPay';


const NewOrder = ({ products, setProducts }) => {
    const { user } = useContext(AuthContext);
    // const userId = user.id;
    const [dataClient, setDataClient] = useState('')

    const removeSubmit = (event) => {
        event.preventDefault()
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
        <Form onSubmit={handleSubmit(removeSubmit)}>
            <Col xs="auto" className='comp-padding'>
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Cliente
                </Form.Label>
                <InputGroup className="mb-2">
                    <FormControl type='text' className='form-control' name='Cliente' placeholder='Cliente' onChange={handleInputChange} />
                </InputGroup>
                <Ordered products={products} setProducts={setProducts} />
            </Col>
            {total > 0 &&
            <Col>
                <TotalPay products={products} />
                <div className='btn-component'>
                <button className='global-btn'><FontAwesomeIcon icon={faCutlery} /> Confirmar</button>
                </div>
            </Col>
            }
        </Form >
    )
}
export default NewOrder;