import React from 'react';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WaiterScreen } from '../../../components/waiter/WaiterScreen';
import { AuthContext } from '../../../auth/authContext';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

//beforeAll(() => jest.spyOn(window, 'fetch')) //modifica
const products = [
    {
      "id": 1,
      "name": "Sandwich de jamón y queso",
      "price": 1000,
      "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg",
      "type": "Desayuno",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "id": 2,
      "name": "Café americano",
      "price": 500,
      "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
      "type": "Desayuno",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "id": 3,
      "name": "Agua 500ml",
      "price": 500,
      "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/water.jpg",
      "type": "Almuerzo",
      "dateEntry": "2022-03-05 15:14:10"
    }
  ]
const server = setupServer(
    rest.get('http://localhost:8080/products', (req, res, ctx) => {
      return res(ctx.json(products)) //Texto en la vista
    }),
  )
  
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

describe('Testeando el compomente padre WaiterScreen', () => {
    const userMock = {
        email: 'leidy.hopper@systers.xyz',
    };
    
    test('Renderiza el componente', () => {
        render(
            <AuthContext.Provider value={{
                user: userMock,
            }}>
                <WaiterScreen />
            </AuthContext.Provider>
        )
        const ordersReady = screen.getByTestId('orders-ready');
        expect(ordersReady).toBeInTheDocument();
    })
    test('Al no haber presionado el boton de nueva orden, no se despliega el collapse', () => {
        render(
            <AuthContext.Provider value={{
                user: userMock,
            }}>
                <WaiterScreen />
            </AuthContext.Provider>
        )
        expect(screen.getByText('usuario: leidy.hopper@systers.xyz')).not.toBeDisabled()
    });
    test('Se muestran los productos al hacer click en menú', async () => {
        render(
            <AuthContext.Provider value={{
                user: userMock,
            }}>
                <WaiterScreen />
            </AuthContext.Provider>
        )
        const btn = screen.getByTestId('btn-fetch');
        fireEvent.click(btn);
        await waitFor(() => {
            const cards = screen.getAllByTestId('card-product');
            expect(cards.length).toEqual(products.length)
        })
        
    })
    // test.only('Al presionar el boton se llama a la funcion viewProduct', () => {
    //     render(
    //         <AuthContext.Provider value={{
    //             user: userMock,
    //         }}>
    //             <WaiterScreen />
    //         </AuthContext.Provider>
    //     )
    //     window.fetch.mockResolvedValueOnce({
    //         ok: true,
    //         json: async () => ({success: true}),
    //       })
    //       userEvent.click(screen.getByRole('button'))
    //       expect(window.fetch).toHaveBeenCalledTimes(1)
    //     // const btn = screen.getByRole('button')
    //     // fireEvent.click(btn)

       
    // });
    // test('Petición a la Api', () => {

    // })
})