import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TotalPay from '../../../../components/products/TotalPay/TotalPay';

describe('Testeando componente TotalPay', () => {
    test('Renderiza la suma de los precios', () => {
        const products = [
            {
                'dateEntry': '2022-03-05 15:14:10',
                'id': 1,
                'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
                'name': 'Sandwich de jamón y queso',
                'price': 1000,
                'quantity': 2,
                'type': 'Desayuno'
            }
        ];
        render(<TotalPay products={products} />)
        const subtotal = screen.queryByTestId('subtotal');
        const tip = screen.queryByTestId('tip');
        const total = screen.queryByTestId('total')
        expect(subtotal).toHaveTextContent('$2000');
        expect(tip).toHaveTextContent('$200');
        expect(total).toHaveTextContent('$2200');
    })
})