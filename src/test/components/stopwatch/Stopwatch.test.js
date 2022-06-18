import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../auth/authContext";
import { StopWatch } from "../../../components/stopwatch/Stopwatch";
import "@testing-library/jest-dom";

const userMock = { token: '' };
const dispatchMock = () => { };

const mockHandleStart = jest.fn();
const mockPausedStart = jest.fn();
const mockPausedResume = jest.fn();
const mockPausedReset = jest.fn();
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
});