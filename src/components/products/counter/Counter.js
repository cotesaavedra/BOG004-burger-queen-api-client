import React from "react";
import './Counter.css';

const Counter = ({amount, retorno}) => {
    // const [ counter, setCounter] = useState( amount ? amount : 0 );

    const handleAdd = (e) => {
        // setCounter( counter + 1);
        retorno(amount + 1);
    };
    const handleSubtract = () => {
        if (amount <= 0){
            retorno(amount)
        } else {
            retorno(amount - 1)
        }
    }
    return (
        <div id='products-card'>
            <button onClick={ handleSubtract }>-</button>            
            <p>{ amount }</p>
            <button onClick={ handleAdd }>+</button>
        </div>
    )

}
export default Counter;