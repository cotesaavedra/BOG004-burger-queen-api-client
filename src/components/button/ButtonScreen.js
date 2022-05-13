import { Button } from 'react-bootstrap';

function LoginBtn() {
  const actualizar = () => {
    fetch('http://localhost:8080/products', {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MjQ1MDY0NywiZXhwIjoxNjUyNDU0MjQ3LCJzdWIiOiIyIn0.egIcArVJta0vJqtihRa_2BuIQXko0GJpGRVaicvUH7Y'
      }   
    })
      .then(response => response.json())
      .then(data => {
       console.log(data);
      });  
  }
  return (
    <div className="btn">
      <button onClick={actualizar}>click</button>
      <Button variant="outline-success">Success</Button>
    </div>
  );
}
export default LoginBtn;
