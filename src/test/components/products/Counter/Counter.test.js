import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../../../../components/products/Counter/Counter';

describe('testeando el contador, la suma y la resta', () => {
    const calculate = jest.fn();
    test.only('Cuando qty es 0 el contador debe estar en 0', () => {
        let qty = 0;
        render(<Counter amount={qty} calculate={calculate} />)
        const counter = screen.queryByTestId('counter');
        expect(counter).toHaveTextContent(qty.toString());
    })
    test.only('El contador debe sumar 1 si se clickea el btn-substract', async () => {
        // const handleAdd = jest.fn();
        let qty = 10;

        render(<Counter amount={qty} calculate={calculate} />)
       
        const sumBtn = screen.queryByTestId('btn-add');
        // fireEvent.click(sumBtn)
        fireEvent.click(sumBtn)

        expect(calculate.mock.calls[0][0]).toBe(qty + 1)
    })
})