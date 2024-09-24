import React, {useContext} from "react";
import "../../styles/AddEditTask.css";
import {AppContext} from "../../stateManagement/context/AppContext.tsx";
import {Task} from "../../types/kanbanTypes";

interface AddEditSubtaskProps {
    placeholder: string;
}

const AddEditSubtask = ({placeholder}: AddEditSubtaskProps) => {
    return (
        <div className="subtask-input-item">
            <input type="text" id="subtask" className="input-field subtask-text-input" placeholder={placeholder}/>
            <svg className="icon icon-subtask-delete" width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <g fill-rule="evenodd">
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/>
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/>
                </g>
            </svg>
        </div>
    );
}

interface AddEditTaskProps {
    closeTaskModal: () => void;
    isEditMode: boolean;
    task?: Task;
}

const AddEditTask = ({closeTaskModal, isEditMode, task}: AddEditTaskProps) => {
    const {state} = useContext(AppContext);
    const {boards, activeBoardIndex} = state;

    return (
        <div className="modal-overlay" onClick={closeTaskModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title-container">
                    {isEditMode ? (<h1 className="heading-L">Edit Task</h1>) : (
                        <h1 className="heading-L">Add New Task</h1>)}
                </div>
                <div className="input-container">
                    <div className="input-item">
                        <label htmlFor="title" className="text-M grey-text">Title</label>
                        <input type="text" id="title" className="input-field text-L"
                               placeholder="e.g. Take coffee break">
                            {task?.title}
                        </input>
                    </div>
                    <div className="input-item">
                        <label htmlFor="description" className="text-M grey-text">Description</label>
                        <textarea id="description" className="input-field text-area text-L"
                                  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.">
                            {task?.description}
                        </textarea>
                    </div>
                    <div className="subtask-form-container">
                        <label htmlFor="subtask" className="text-M grey-text">Subtasks</label>
                        <div className="subtask-input-container">
                            <AddEditSubtask placeholder="e.g. Make coffee"/>
                            <AddEditSubtask placeholder="e.g. Drink coffee & smile"/>
                            <button className="add-subtask-btn text-M">+ Add New Subtask</button>
                        </div>
                    </div>
                    <div className="input-item">
                        <label htmlFor="status" className="text-M grey-text">Status</label>
                        <select id="status" className="input-field text-L">
                            {boards[activeBoardIndex!].columns.map((col, index) => (
                                <option key={index} value={col.name}>{col.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-item">
                        <button className="btn submit-btn text-L">Create Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditTask;
