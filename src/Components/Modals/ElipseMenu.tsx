import React from 'react';
import { Board, Task } from '../../types/kanbanTypes';
import "../../styles/Header.css";

type ElipseMenuProps = {
    type: 'board' | 'task';
    item: Board | Task;
    index: number;
    onEdit: () => void;
};

const ElipseMenu = ({ type, onEdit }: ElipseMenuProps) => {
    return (
        <div className='elipse-menu-container text-L'>
            <p className='grey-text' onClick={onEdit}>Edit {type}</p>
            <p className='red-text'>Delete {type}</p>
        </div>
    );
};

export default ElipseMenu;