import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../auth/authContext";
import { StopWatch } from "../../../components/stopwatch/Stopwatch";
import useTimer from "../../../hooks/useTimer";
import "@testing-library/jest-dom";

const userMock = { token: '' };
const dispatchMock = () => { };

jest.mock("../../../hooks/useTimer", () => {
  return Object.assign(jest.fn(), {
    timer: jest.fn,
    isActive: jest.fn,
    isPaused: jest.fn,
    handleStart: jest.fn,
    handlePause: jest.fn,
    handleResume: jest.fn,
    handleReset: jest.fn,
  });
});

describe('Tests ChefScreen', () => {
  test('Stopwatch', async () => {

    render
      (
        <AuthContext.Provider value={{
          user: userMock,
          dispatch: dispatchMock
        }}>
          <StopWatch />
        </AuthContext.Provider>
      );

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(useTimer.handleStart).toHaveBeenCalled();
    });
  });
});