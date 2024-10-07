import React from 'react';
import {Board, Task} from "../../types/kanbanTypes";
import "../../styles/ConfirmDelete.css";

interface ConfirmDeleteProps {
    type: 'board' | 'task';
    item: Board | Task;
    id: string | null;
    onDelete: () => void;
    onCancel: () => void;
}

const ConfirmDelete = ({type, item, onDelete, onCancel}: ConfirmDeleteProps) => {
    const itemName = type === 'board' ? (item as Board).name : (item as Task).title;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-content-container">
                    <h3 className="red-text heading-L">
                        Delete this {type}?
                    </h3>
                    {type === 'board' ? (
                        <p className="text-L grey-text">
                            Are you sure you want to delete the ‘{itemName}’ board? This action will
                            remove all columns and tasks and cannot be reversed.
                        </p>
                    ) : (
                        <p className="text-L grey-text">
                            Are you sure you want to delete the ‘{itemName}’ task and its subtasks? This
                            action cannot be reversed.
                        </p>
                    )}
                    <div className="modal-btn-container">
                        <button className="btn btn-red" onClick={onDelete}>Delete</button>
                        <button className="btn btn-grey" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;