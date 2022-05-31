import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/login/LoginScreen.js";
import { AuthContext } from "../../../auth/authContext.js";
import React from 'react';
import axios from 'axios';

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom")),
    useNavigate: () => mockUseNavigate,
}));

// jest.mock('axios');

const userMock = {};
const dispatchMock = () => { };

test('toAccess', async () => {
    axios.post.mockResolvedValue({
        data: {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MzQwNDc5NywiZXhwIjoxNjUzNDA4Mzk3LCJzdWIiOiIyIn0.1KNtqxvOaQyvDU8XzA-Ia3aTG2EMpeotXmBb4nQ58sw",
            user: {
                email: "grace.hopper@systers.xyz",
                roles: {
                    admin: true
                },
                id: 2
            }
        }
    });
    render(
        <AuthContext.Provider value={{
            user: userMock,
            dispatch: dispatchMock
        }}>
            < LoginScreen />
        </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith("/admin", { replace: true });
    });
});

test('access', async () => {
    axios.post.mockResolvedValue({
        data: {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MzQwNDc5NywiZXhwIjoxNjUzNDA4Mzk3LCJzdWIiOiIyIn0.1KNtqxvOaQyvDU8XzA-Ia3aTG2EMpeotXmBb4nQ58sw",
            user: {
                email: "cote.hopper@systers.xyz",
                roles: {
                    chef: true
                },
                id: 3
            }
        }
    });
    render(
        <AuthContext.Provider value={{
            user: userMock,
            dispatch: dispatchMock
        }}>
            < LoginScreen />
        </AuthContext.Provider>
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith("/chef", { replace: true });
    });
});

test('accessWaiter', async () => {

    axios.post.mockResolvedValue({
        data: {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY1MzQwNDc5NywiZXhwIjoxNjUzNDA4Mzk3LCJzdWIiOiIyIn0.1KNtqxvOaQyvDU8XzA-Ia3aTG2EMpeotXmBb4nQ58sw",
            user: {
                email: "leidy.hopper@systers.xyz",
                roles: {
                    waiter: true
                },
                id: 3
            }
        }
    });
    render(
        <AuthContext.Provider value={{
            user: userMock,
            dispatch: dispatchMock
        }}>
            < LoginScreen />
        </AuthContext.Provider>
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith("/waiter", { replace: true });
    });

});