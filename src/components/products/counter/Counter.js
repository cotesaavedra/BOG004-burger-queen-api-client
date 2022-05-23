import React from "react";
import './Counter.css';

const Counter = ({amount, retorno}) => {
    // const [ counter, setCounter] = useState( amount ? amount : 0 );

    const handleAdd = (e) => {
        // setCounter( counter + 1);
        retorno(amount + 1);
    };
    const handleSubtract = () => {
        // setCounter( counter -1);
        retorno(amount - 1)
    }
    return (
        <div id='products-card'>
            <button onClick={ handleAdd }>+</button>
            <p>{ amount }</p>
            <button onClick={ handleSubtract }>-</button>
        </div>
    )

}
export default Counter;