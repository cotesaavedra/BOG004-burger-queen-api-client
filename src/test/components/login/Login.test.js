import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginScreen, useForm } from "../../../components/login/LoginScreen.js";
import { AuthContext } from "../../../auth/authContext.js";


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn())
}));
jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm : () => (jest.fn())
}));


test('login', () => {
    const userMock = {};
    const dispatchMock = {};
    render(
        <AuthContext.Provider value={{
            userMock,
            dispatchMock
        }}>
            < LoginScreen />
        </AuthContext.Provider>
    );
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
})
test('renders loginScreen', () => {
     

expect('cont-login').toBeInTheDocument();
}