import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/login/LoginScreen.js";
import { AuthContext } from "../../../auth/authContext.js";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn())
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