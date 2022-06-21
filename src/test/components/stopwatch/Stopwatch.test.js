import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../auth/authContext";
import { StopWatch } from "../../../components/stopwatch/Stopwatch";
import "@testing-library/jest-dom";
import axios from "axios";

const userMock = { token: '' };
const dispatchMock = () => { };

const mockHandleStart = jest.fn();
const mockPausedStart = jest.fn();
const mockPausedResume = jest.fn();
const mockPausedReset = jest.fn();
const order  = jest.fn();
const send = jest.fn();
const off = jest.fn();
const handleDone = jest.fn();
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
let mockIsActive = false;
let mockIsPaused = false;

jest.mock("../../../hooks/useTimer", () => {
  return () => (
    Object.assign(jest.fn(), {
      timer: jest.fn(),
      isActive: mockIsActive,
      isPaused: mockIsPaused,
      handleStart: mockHandleStart,
      handlePause: mockPausedStart,
      handleResume: mockPausedResume,
      handleReset: mockPausedReset,
    }))
});

describe('Tests Stopwacth', () => {

  test('Stopwatch -> click in Start button', async () => {
    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock
        }}>
          <StopWatch />
        </AuthContext.Provider>
      );
    const buttons = await screen.findAllByRole("button");
    fireEvent.click(buttons[0]);
    await waitFor(() => {
      expect(mockHandleStart).toHaveBeenCalled();
    });
  });

  test('Stopwatch -> click in Pause button', async () => {
    mockIsActive = true;
    mockIsPaused = true;
    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock
        }}>
          <StopWatch />
        </AuthContext.Provider>
      );
    const buttons = await screen.findAllByRole("button");
    fireEvent.click(buttons[0]);
    await waitFor(() => {
      expect(mockPausedStart).toHaveBeenCalled();
    });
  });

  test('Stopwatch -> click in Resume button', async () => {
    mockIsActive = true;
    mockIsPaused = false;
    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock
        }}>
          <StopWatch />
        </AuthContext.Provider>
      );
    const buttons = await screen.findAllByRole("button");
    fireEvent.click(buttons[0]);
    await waitFor(() => {
      expect(mockPausedResume).toHaveBeenCalled();
    });
  });
  test('Stopwatch -> click in Done button', async () => {
    axios.post.mockResolveValue( ordersMock, handleDone, ()=>{
      
      ordersMock(order.dataEntry)
    } );
     
    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock
        }}>
          <StopWatch  onClick={send} disabled={off}/>
        </AuthContext.Provider>
      );
    const buttons =  screen.getByTestId("btn-Done");
    fireEvent.click(buttons);
    await waitFor(() => {
      expect(order.dataEntry).toBeCalled();
    });
  });
 });