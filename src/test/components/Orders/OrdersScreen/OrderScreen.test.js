import React from 'react';
import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OrdersScreen } from '../../../../components/Orders/OrdersScreen/OrdersScreen';
import { AuthContext } from '../../../../auth/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
afterEach(cleanup);
describe('testeando componente OrdersScreen', () => {
    const userMock = {};
    const orders =  [
        {
          "id": 1,
          "userId": 1,
          "client": "Jude Milhon",
          "products": [
            {
              "qty": 1,
              "product": {
                "id": 1,
                "name": "Sandwich de jamón y queso",
                "price": 1000,
                "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
              }
            },
            {
              "qty": 1,
              "product": {
                "id": 2,
                "name": "Café americano",
                "price": 500,
                "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
              }
            }
          ],
          "status": "pending",
          "dataEntry": "2022-03-05 15:00"
        }
    ]
    test('Hace la petición a axios 1 vez', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({
            data: orders
        });
        render(
            <Router>
                <AuthContext.Provider value={{
                    user: userMock,
                }}>
                    <OrdersScreen />
                </AuthContext.Provider>
            </Router>
        )

        await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        })
    })
})
