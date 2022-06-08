import React from 'react'
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils';
import './Stopwatch.css'


export const StopWatch = ({ order }) => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  const handleDone = () => {
    const dateProcessed = new Date(order.dataEntry);
    dateProcessed.setSeconds(timer);
    const minutes = `0${dateProcessed.getMinutes() % 60}`.slice(-2);
    const seconds = `0${(dateProcessed.getSeconds() % 60)}`.slice(-2);
    order.dateProcessed = `${dateProcessed.getFullYear()}-${dateProcessed.getMonth() + 1}-${dateProcessed.getDate()} ${dateProcessed.getHours()}:${minutes}:${seconds}`;
    order.status = 'delivered';
    console.log(order);
    handleReset();
  }

  return (
    <>
      <div className='stopwatch'>
        <span>{formatTime(timer)}</span>
        {
          !isActive && !isPaused ?
            <div>
              <button className='btn-stopwatch' onClick={handleStart}>Start</button></div>
            : (
              isPaused ? <div><button className='btn-stopwatch' onClick={handlePause}>Pause</button></div> :
                <div><button className='btn-stopwatch' onClick={handleResume}>Resume</button></div>
            )
        }
        <div><button className='btn-stopwatch' onClick={handleDone} disabled={!isActive}>Done</button></div>
      </div>
    </>
  );
};
