/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import "../styles/EmptyBoard.css"
import { AppContext } from '../stateManagement/context/AppContext';
import { useMediaQuery } from 'react-responsive';

const EmptyBoard = () => {
  const isBiggerScreen = useMediaQuery({ minWidth: 768 }); //For Tablet and up
  const { state, dispatch } = useContext(AppContext);

  
  return (
    <div className="empty-board-container">
      <div className='empty-board-content'>
        <p className='heading-L'>
          This Board is empty. Create a new column to get started.
        </p>
        <button className='btn heading-M'>
          + Add New Column
        </button>
      </div>
    </div>
  )
}

export default EmptyBoard