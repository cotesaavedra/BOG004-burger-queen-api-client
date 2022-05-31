import React from 'react';
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewOrder from '../../../../components/products/NewOrder/NewOrder';

afterEach(cleanup);
describe('Testeando componente NewOrder', () => {
    const products = [
        {
            'dateEntry': '2022-03-05 15:14:10',
            'id': 1,
            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
            'name': 'Sandwich de jamón y queso',
            'price': 1000,
            'type': 'Desayuno'
        }
    ];
    test('el valor del input es el del cliente', () => {
        render (
            <NewOrder products={products}></NewOrder>
        )
        const nameInput = screen.queryByTestId('name-client');
        fireEvent.change(nameInput, {target: {value: 'Juanita Perez'}});
        expect(nameInput.value).toBe('Juanita Perez');
    })
    test('renderiza un formulario', () => {
        render (
            <NewOrder products={products}></NewOrder>
        )
        const form = screen.queryByTestId('form')
        expect(form).toBeInTheDocument();
    });
})