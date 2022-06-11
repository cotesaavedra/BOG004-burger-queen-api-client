import React from 'react';
import { render, waitFor, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContext } from '../../../../auth/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { Status } from '../../../../components/Orders/Status/Status';


jest.mock('axios');
afterEach(cleanup);
describe('testeando componente OrdersScreen', () => {
    const callOrders = jest.fn();
    const userMock = {};
    test('Se hace una llamada a axios cuando se hace click en Pendiente', async () => {
        const orders = [
            {
                'id': 1,
                'userId': 1,
                'client': 'Jude Milhon',
                'products': [
                    {
                        'qty': 1,
                        'product': {
                            'id': 1,
                            'name': 'Sandwich de jamón y queso',
                            'price': 1000,
                            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
                            'type': 'Desayuno',
                            'dateEntry': '2022-03-05 15:14:10'
                        }
                    },
                    {
                        'qty': 1,
                        'product': {
                            'id': 2,
                            'name': 'Café americano',
                            'price': 500,
                            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg',
                            'type': 'Desayuno',
                            'dateEntry': '2022-03-05 15:14:10'
                        }
                    }
                ],
                'status': 'delivering',
                'dataEntry': '2022-03-05 15:00'
            }
        ]
        axios.patch = jest.fn().mockResolvedValueOnce({
            data: orders
        });
        render(
            <Router>
                <AuthContext.Provider value={{
                    user: userMock,
                }}>
                    <Status orders={orders} callOrders={callOrders}></Status>
                </AuthContext.Provider>
            </Router>
        )
        const btnStatus = screen.queryByTestId('btn-status-delivering');
        fireEvent.click(btnStatus)
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledTimes(1);
        })
    });
    test('Se hace una llamada a axios cuando se hace click en entregado', async () => {
        const orders = [
            {
                'id': 1,
                'userId': 1,
                'client': 'Jude Milhon',
                'products': [
                    {
                        'qty': 1,
                        'product': {
                            'id': 1,
                            'name': 'Sandwich de jamón y queso',
                            'price': 1000,
                            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
                            'type': 'Desayuno',
                            'dateEntry': '2022-03-05 15:14:10'
                        }
                    },
                    {
                        'qty': 1,
                        'product': {
                            'id': 2,
                            'name': 'Café americano',
                            'price': 500,
                            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg',
                            'type': 'Desayuno',
                            'dateEntry': '2022-03-05 15:14:10'
                        }
                    }
                ],
                'status': 'delivered',
                'dataEntry': '2022-03-05 15:00'
            }
        ]
        axios.patch = jest.fn().mockResolvedValueOnce({
            data: orders
        });
        render(
            <Router>
                <AuthContext.Provider value={{
                    user: userMock,
                }}>
                    <Status orders={orders} callOrders={callOrders}></Status>
                </AuthContext.Provider>
            </Router>
        )
        const btnStatus = screen.queryByTestId('btn-status-delivered');
        fireEvent.click(btnStatus)
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledTimes(1);
        })
    })
    
})