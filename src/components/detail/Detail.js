import React from 'react'
import { ChefScreen } from '../chef/ChefScreen'
import { NavLeft } from '../ui/left/NavLeft'


export const Detail = (props) => {


  return (
    <>
      <div>Detail</div>
      <NavLeft>
        <div>
          <button onClick={props.onClick}>
          Detail
          </button>
        </div>
      </NavLeft>
      <ChefScreen />
    </>
  )
}
