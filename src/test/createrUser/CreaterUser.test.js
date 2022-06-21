import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContext } from '../../auth/authContext';
import { CreateUser } from '../../components/Users/createUser/CreateUser';
import axios from 'axios';

jest.mock('axios');
const ordersMock = [
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
   },
   {
      "id": 2,
      "userId": 2,
      "client": "Katie Bouman",
      "products": [
         {
            "qty": 2,
            "product": {
               "id": 2,
               "name": "Café americano",
               "price": 500,
               "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
               "type": "Desayuno",
               "dateEntry": "2022-03-05 15:14:10"
            }
         },
         {
            "qty": 1,
            "product": {
               "id": 3,
               "name": "Agua 500ml",
               "price": 500,
               "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/water.jpg",
               "type": "Almuerzo",
               "dateEntry": "2022-03-05 15:14:10"
            }
         }
      ],
      "status": "delivered",
      "dataEntry": "2022-03-05 15:00",
      "dateProcessed": "2022-03-05 16:00"
   }
];

describe('prueba de crear usuarios', () => {
   const userMock = {};
   const callUsersMock = jest.fn();
   const usersMock = [
      {
         "email": "cote.hopper@systers.xyz",
         "password": "$2a$10$19aCEvJdU0CP4DyBuM9Ga.62T8iX19tmgDPMZFPlVlAoDG.ltBHFO",
         "roles": {
            "chef": true
         },
         "id": 4
      }]
   test('renderiza una modal al hacer click en createuser', () => {
      axios.post.mockResolvedValue(
         { data: ordersMock }
      );
      render(
         <AuthContext.Provider value={{
            user: userMock,
         }}>
            <CreateUser users={usersMock} callUsers={callUsersMock}></CreateUser>

         </AuthContext.Provider>
      )
      const newEmployee = screen.queryByTestId('icon-newEmployee');
      fireEvent.click(newEmployee)
      const modal = screen.queryByTestId('icon-modal-user');
      expect(modal).toBeInTheDocument();
      const email = screen.queryByTestId('icon-email-user');
      expect(email).toBeInTheDocument()
      const form = screen.queryByTestId('icon-form-user');
      expect(form).toBeInTheDocument()

   });
});