import './NavLeft.css';
import { Col } from 'react-bootstrap';


const NavLeft = (props) => {
    return (
        <Col lg='2' sm='auto'>
            <div id='cont-nav'>
            {
                props.children
            }
            </div>
        </Col>
    )
}
export default NavLeft
