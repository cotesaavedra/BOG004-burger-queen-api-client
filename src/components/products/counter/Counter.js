import React from "react";
import './Counter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Counter = ({ amount, calculate }) => {
    const handleAdd = () => {
        calculate(amount + 1);
    };
    const handleSubtract = () => {
        if (amount <= 0) {
            calculate(amount);
        }else {
            calculate(amount - 1);
        }
    }
    return (
        <div id='products-card'>
            <button onClick={handleSubtract}><FontAwesomeIcon icon={faMinus} /></button>
            <p>{amount}</p>
            <button onClick={handleAdd}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
}
export default Counter
