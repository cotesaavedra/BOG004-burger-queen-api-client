import './NavLeft.css';
import { Col } from 'react-bootstrap';


export function NavLeft(props) {
    
    return (
    
        <Col lg='2'>
            <div id='cont-nav'>
            {
                props.children
            }
            </div>
        </Col>

    )
  
}