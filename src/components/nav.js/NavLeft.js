import { Col } from 'react-bootstrap';

export function NavLeft(props) {
    return (
        <Col lg='3' style={{background:'#c2c2c2', height:'300px'}}>
            nombre:{props.nombre}
            {
                props.children
            }
            LogOut
        </Col>

    )
}