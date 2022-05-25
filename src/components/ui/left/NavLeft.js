import './NavLeft.css';
import { Col } from 'react-bootstrap';


const NavLeft = (props) => {
    return (
        <Col lg='2'>
            <div id='cont-nav'>
            {/* nombre:{props.nombre} */}
            {
                props.children
            }
            {/* LogOut */}
            </div>
        </Col>
    )
}
export default NavLeft
