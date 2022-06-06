import React from 'react';
import { cleanup, render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmOrder from "../../../../components/products/ConfirmOrder/ConfirmOrder.js";
import { AuthContext } from '../../../../auth/authContext.js';
import axios from 'axios';

afterEach(cleanup);
describe('Testeando el componente con la función de agregar nueva orden-boton', () => {
    const userMock = {};

    const products = [
        {
            'dateEntry': '2022-03-05 15:14:10',
            'id': 1,
            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
            'name': 'Sandwich de jamón y queso',
            'price': 1000,
            'quantity': 0,
            'type': 'Desayuno'
        }
    ];
    const dataClient = { Cliente: 'Juanita Perez' };

    test('renderiza el boton Confirmar', () => {
        render(
            <AuthContext.Provider value={{
                user: userMock,
            }}>
                <ConfirmOrder products={products} dataClient={dataClient} />
            </AuthContext.Provider>)

        const btn = screen.queryByTestId('btn-confirm');
        expect(btn).toHaveTextContent('Confirmar')
    });
    test('Al hacer la llamada a la Api correctamente el botón cambia de estado', async () => {
        axios.post.mockResolvedValueOnce({
            data: [{
                client: 'Juanita',
                id: 19,
                products: products
            }],
        });

        render(<AuthContext.Provider value={{
            user: userMock,
        }}>
            <ConfirmOrder products={products} dataClient={dataClient} />
        </AuthContext.Provider>)
        fireEvent.click(screen.queryByTestId('btn-confirm'));
        await waitFor(() => {
            const btn = screen.queryByTestId('btn-send');
            expect(btn).toHaveTextContent('Enviando cocina...')
        })
    });
    test('Luego de 1 segundo con la petición exitosa aparecerá el texto Orden enviada', async () => {
        axios.post.mockResolvedValueOnce({
            data: [{
                client: 'Juanita',
                id: 19,
                products: products
            }],
        });

        render(<AuthContext.Provider value={{
            user: userMock,
        }}>
            <ConfirmOrder products={products} dataClient={dataClient} />
        </AuthContext.Provider>)

        fireEvent.click(screen.queryByTestId('btn-confirm'));
        await (waitFor(() => screen.findByTestId('btn-created'), { timeout: 3000 }));
        expect(screen.queryByTestId('btn-created')).toHaveTextContent('Orden enviada')
    })
})
