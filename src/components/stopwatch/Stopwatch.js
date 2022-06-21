import React, { useContext } from 'react'
import { AuthContext } from '../../auth/authContext';
import useTimer from '../../hooks/useTimer';
import { Apiurl } from '../../services/apirest';
import { formatTime } from '../../utils';
import './Stopwatch.css'
import axios from 'axios';
import { toast } from 'react-toastify';


export const StopWatch = ({ order, getOrders }) => {
  const { user } = useContext(AuthContext);
  let token = user.token;

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);
  const handleDone = () => {
    const dateProcessed = new Date(order.dataEntry);
    dateProcessed.setSeconds(timer);
    const minutes = `0${dateProcessed.getMinutes() % 60}`.slice(-2);
    const seconds = `0${(dateProcessed.getSeconds() % 60)}`.slice(-2);
    order.dateProcessed = `${dateProcessed.getFullYear()}-${dateProcessed.getMonth() + 1}-${dateProcessed.getDate()} ${dateProcessed.getHours()}:${minutes}:${seconds}`;
    order.status = 'delivered';
    const id = order.id
    let url = `${Apiurl}orders/${id}`;
    let status = { status: 'delivering' };
    axios.patch(url, status,

      {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      }
    )

      .then(response => {

        getOrders();
      })
      .catch(error => {
        toast.error('No se actualizo');
      });



    handleReset();
  }

  return (
    <>
      <div className='stopwatch'>
        <span>{formatTime(timer)}</span>
        {
          !isActive && !isPaused ?
            <div>
              <button className='btn-stopwatch' onClick={handleStart}>Start</button>
            </div>
            : (
              isPaused ? <div><button className='btn-stopwatch' onClick={handlePause}>Pause</button></div> :
                <div><button className='btn-stopwatch' onClick={handleResume}>Resume</button></div>
            )
        }
        <div><button data-testid='btn-Done' className='btn-stopwatch' onClick={handleDone} disabled={!isActive} >Done</button></div>
      </div>
    </>
  );
};
