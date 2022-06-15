import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from '../../../../auth/authContext';
import { ViewUsers } from '../../../../components/Users/ViewUsers/ViewUsers';

jest.mock('axios');
afterEach(cleanup);
describe('testeando componente ViewUsers', () => {
    const userMock = {};
    const callUsers = jest.fn();
    const usersMock = [
        {
            "email": "cote.hopper@systers.xyz",
            "password": "$2a$10$19aCEvJdU0CP4DyBuM9Ga.62T8iX19tmgDPMZFPlVlAoDG.ltBHFO",
            "roles": {
                "chef": true
            },
            "id": 4
        },
        {
            "email": "grace.hopper@systers.xyz",
            "password": "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
            "roles": {
                "admin": true
            },
            "id": 2
        },
        {
            "email": "leidy.hopper@systers.xyz",
            "password": "$2a$10$Ap1gLSR/jfZLY2MKoFQdBeZHYEozzLTii4FLo5wKoHrPT1n.THU8G",
            "roles": {
                "waiter": true
            },
            "id": 3
        }
    ]

    test('renderiza una tabla con datos de los usuarios', () => {
        render(
                <AuthContext.Provider value={{
                    user: userMock,
                }}>
                    <ViewUsers users={usersMock} callUsers={callUsers} />
                </AuthContext.Provider>
        )
        const emailTable = screen.getByText('grace.hopper@systers.xyz');
        expect(emailTable).toBeInTheDocument();
        const email = screen.queryByTestId('user-email');
        expect(email).toBeInTheDocument();
        const waiter = screen.getByText('Mesero');
        expect(waiter).toBeInTheDocument();
        const chef = screen.getByText('Chef');
        expect(chef).toBeInTheDocument();
    })
})
