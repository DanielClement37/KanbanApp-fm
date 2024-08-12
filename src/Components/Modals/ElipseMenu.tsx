import React from 'react'
import { Board, Task } from '../../types/kanbanTypes';
import "../../styles/Header.css"

type ElipseMenuProps = {
  type: 'board' | 'task';
  item: Board | Task;
  index: number
}

const ElipseMenu = (props: ElipseMenuProps) => {
  return (
    <div className='elipse-menu-container text-L'>
        <p className='grey-text'>Edit {props.type}</p>
        <p className='red-text'>Delete {props.type}</p>
    </div>
  )
}

export default ElipseMenu