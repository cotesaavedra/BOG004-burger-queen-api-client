import { Row, Col } from 'react-bootstrap';
import { NavLeft } from '../NavLeft';

export const ChefScreen= () =>{
  return (
    <Row>
      <NavLeft nombre='diego'>
        <h1>Ordenes</h1>
        <h1>jojo</h1>
      </NavLeft>
      <Col lg={9}>
        <h1>ChefScreen</h1>

      </Col>

    </Row>
  )
}