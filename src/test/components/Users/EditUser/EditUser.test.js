import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContext } from '../../../../auth/authContext';
import { EditUser } from '../../../../components/Users/EditUser/EditUser';
import { ViewUsers } from '../../../../components/Users/ViewUsers/ViewUsers';
import axios from 'axios';

jest.mock('axios');
afterEach(cleanup);
describe('testeando componente ViewUsers', () => {
    const userMock = {};
    const callUsersMock = jest.fn();
    const userToEditMock =
    {
        "email": "cote.hopper@systers.xyz",
        "password": "$2a$10$19aCEvJdU0CP4DyBuM9Ga.62T8iX19tmgDPMZFPlVlAoDG.ltBHFO",
        "roles": {
            "chef": true
        },
        "id": 4
    }
    const usersMock = [
        {
            "email": "cote.hopper@systers.xyz",
            "password": "$2a$10$19aCEvJdU0CP4DyBuM9Ga.62T8iX19tmgDPMZFPlVlAoDG.ltBHFO",
            "roles": {
                "chef": true
            },
            "id": 4
        }]
    test('renderiza una modal al hacer click en editar', () => {
        render(
            <AuthContext.Provider value={{
                user: userMock,
            }}>
                <ViewUsers users={usersMock} callUsers={callUsersMock}><EditUser userToEdit={userToEditMock} callUsers={callUsersMock} /></ViewUsers>

            </AuthContext.Provider>
        )
        const iconEdit = screen.queryByTestId('icon-edit');
        fireEvent.click(iconEdit);
        const modal = screen.queryByTestId('modal');
        expect(modal).toBeInTheDocument();
        const email = screen.queryByTestId('email')
        const form = screen.queryByTestId('form');
        expect(email).toBeInTheDocument()
        expect(form).toBeInTheDocument()
    });
    test.only('se llamo a axios', async () => {
        axios.patch = jest.fn().mockResolvedValueOnce({
            data: {
                'email': 'juanita.hopper@systers.xyz',
                'password': '$2a$10$19aCEvJdU0CP4DyBuM9Ga.62T8iX19tmgDPMZFPlVlAoDG.ltBHFO',
                'roles': {
                    "admin": true
                },
            }
        });
        render(
            <AuthContext.Provider value={{
                user: userMock,
            }}>
                <ViewUsers users={usersMock} callUsers={callUsersMock}><EditUser userToEdit={userToEditMock} callUsers={callUsersMock} /></ViewUsers>

            </AuthContext.Provider>
        )
        const iconEdit = screen.queryByTestId('icon-edit');
        fireEvent.click(iconEdit);
        const email = screen.queryByTestId('email');
        const password = screen.queryByTestId('password');
        fireEvent.change(email, { target: { value: 'juanita.hopper@systers.xyz' } });
        fireEvent.change(password, { target: { value: '123456' } });
        console.log(screen.queryByTestId('submit'))
        fireEvent.click(screen.queryByTestId('submit'))
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalled()
         });
    })
})