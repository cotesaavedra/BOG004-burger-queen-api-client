import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { AuthContext } from "../../../auth/authContext.js";
import { ChefScreen } from "../../../components/chef/ChefScreen.js";

const userMock = { token: '' };
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
const dispatchMock = () => { };
jest.mock('axios', () => {
   return Object.assign(jest.fn(), {
      get: jest.fn(),
      post: jest.fn(),
   });
});

describe('Tests ChefScreen', () => {
   test('chef', async () => {
      axios.get.mockResolvedValue(
         { data: ordersMock }
      );
      render(
         <AuthContext.Provider value={{
            user: userMock,
            dispatch: dispatchMock
         }}>
            <ChefScreen />
         </AuthContext.Provider>
      );
      await waitFor(() => {
         const order = screen.getByText('Orden 1');
         expect(order).toBeInTheDocument();
      });
   });
});
