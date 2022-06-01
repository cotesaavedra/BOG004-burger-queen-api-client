import React from 'react'
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils';

export const StopWatch = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)

  return (
    <div className="app">
      <div className='stopwatch-card'>
        <p>{formatTime(timer)}</p>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Pause</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          <button onClick={handleReset} disabled={!isActive}>Done</button>
        </div>
      </div>
    </div>
  );
};
