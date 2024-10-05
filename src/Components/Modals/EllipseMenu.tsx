import React from 'react';
import { Board, Task } from '../../types/kanbanTypes';
import "../../styles/Header.css";

type EllipseMenuProps = {
    type: 'board' | 'task';
    item: Board | Task;
    id: string | null;
    onEdit: () => void;
};

const EllipseMenu = ({ type, onEdit }: EllipseMenuProps) => {
    return (
        <div className='elipse-menu-container text-L'>
            <p className='grey-text' onClick={onEdit}>Edit {type}</p>
            <p className='red-text'>Delete {type}</p>
        </div>
    );
};

export default EllipseMenu;