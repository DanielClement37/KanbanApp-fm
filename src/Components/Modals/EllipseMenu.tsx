import React from 'react';
import { Board, Task } from '../../types/kanbanTypes';
import "../../styles/EllipseMenu.css"
import ConfirmDelete from "./ConfirmDelete.tsx";

type EllipseMenuProps = {
    type: 'board' | 'task';
    item: Board | Task;
    id: string | null;
    onEdit: () => void;
    onDelete: () => void;
};

const EllipseMenu = ({ type, onEdit,item,id, onDelete }: EllipseMenuProps) => {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

    return (
        <div className='ellipse-menu-container text-L'>
            <p className='grey-text' onClick={onEdit}>Edit {type}</p>
            <p className='red-text' onClick={()=>setConfirmDeleteOpen(true)}>Delete {type}</p>
            {confirmDeleteOpen && (<ConfirmDelete type={type} item={item} id={id} onDelete={onDelete} onCancel={()=>setConfirmDeleteOpen(false)} />)}
        </div>
    );
};

export default EllipseMenu;