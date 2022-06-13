import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../auth/authContext";
import { DetailOrder } from "../../../components/detailOrder/DetailOrder";

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

describe('Tests DetailOrderScreen', () => {
  test('chef', async () => {

    render(
      <AuthContext.Provider value={{
        user: userMock,
        dispatch: dispatchMock
      }}>
        <DetailOrder order={ordersMock[0]} />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      const detail = screen.getByText('Detail order: 1');
      expect(detail).toBeInTheDocument();
    });
  });
});
