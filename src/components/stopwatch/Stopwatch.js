import React from 'react'
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils';


export const StopWatch = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)

  return (
    <div className="app">
      <div className='stopwatch-card'>
        <p>{formatTime(timer)}</p>
          {
            !isActive && !isPaused ?
            <div>
              <button className='btn-stopwatch' onClick={handleStart}>Start</button></div>
              : (
                isPaused ? <div><button className='btn-stopwatch' onClick={handlePause}>Pause</button></div> :
                <div><button className='btn-stopwatch' onClick={handleResume}>Resume</button></div>
              )
          }
          <div><button className='btn-stopwatch' onClick={handleReset} disabled={!isActive}>Done</button></div>
      </div>
    </div>
  );
};
