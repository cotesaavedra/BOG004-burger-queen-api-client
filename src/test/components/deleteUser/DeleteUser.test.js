import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";
import { AuthContext } from "../../../auth/authContext";
import { DeleteUser } from "../../../components/Users/DeleteUser/DeleteUser";

const userMock = { token: '' };
const dispatchMock = () => { };
jest.mock('axios', () => {
  return ({ delete: jest.fn() })
});

const userToDeleteMock = jest.fn();
const callUsersMock = jest.fn();



describe('Tests DeleteUser', () => {
  test('check when delete ok', async () => {
    axios.delete.mockResolvedValue(
      {}
    );
    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock

        }}>
          <DeleteUser userToDelete={userToDeleteMock} callUsers={callUsersMock} />
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
        </AuthContext.Provider>
      );
    const iconDelete = screen.getByTestId("icon-delete");
    fireEvent.click(iconDelete);
    const btnAceptDelete = screen.getByText("Sí");
    fireEvent.click(btnAceptDelete);
    const alert = await screen.findByText("Se elimino con exito");
    expect(alert).toBeInTheDocument();
  });
  test('check when delete fail', async () => {
    axios.delete.mockRejectedValueOnce();
    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock

        }}>
          <DeleteUser userToDelete={userToDeleteMock} callUsers={callUsersMock} />
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
        </AuthContext.Provider>
      );
    const iconDelete = screen.getByTestId("icon-delete");
    fireEvent.click(iconDelete);
    const btnAceptDelete = screen.getByText("Sí");
    fireEvent.click(btnAceptDelete);
    const alert = await screen.findByText("Error al eliminar usuario");
    expect(alert).toBeInTheDocument();
  });
});

