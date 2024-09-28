import React, {useContext, useState} from "react";
import "../../styles/AddEditTask.css";
import {AppContext} from "../../stateManagement/context/AppContext";
import {Task, Subtask} from "../../types/kanbanTypes";
import {ADD_TASK, UPDATE_TASK} from "../../stateManagement/actions/actiontypes";

interface AddEditSubtaskProps {
    index: number;
    value: string;
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
}

const AddEditSubtask = ({index, value, onChange, onRemove}: AddEditSubtaskProps) => (
    <div className="subtask-input-item">
        <input
            type="text"
            id={`subtask-${index}`}
            className="input-field subtask-text-input"
            placeholder="e.g. Make coffee"
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
        />
        <svg
            className="icon icon-subtask-delete"
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => onRemove(index)}
        >
            <g  fill-rule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/>
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/>
            </g>
        </svg>
    </div>
);

interface AddEditTaskProps {
    closeTaskModal: () => void;
    isEditMode: boolean;
    task?: Task;
    columnName?: string;
    taskIndex?: number;
}


const AddEditTask = ({closeTaskModal, isEditMode, task, columnName, taskIndex}: AddEditTaskProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {boards, activeBoardIndex} = state;

    const initialTaskState: Task = isEditMode && task ? task : {
        title: '',
        description: '',
        status: boards[activeBoardIndex!].columns[0].name,
        subtasks: [],
    };

    const [localTask, setLocalTask] = useState<Task>(initialTaskState);
    const [subtasks, setSubtasks] = useState<Subtask[]>(
        localTask.subtasks.length > 0 ? localTask.subtasks : [
            {title: '', isCompleted: false},
            {title: '', isCompleted: false},
        ]
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTask({...localTask, title: e.target.value});
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalTask({...localTask, description: e.target.value});
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTask({...localTask, status: e.target.value});
    };

    const handleSubtaskChange = (index: number, value: string) => {
        const newSubtasks = [...subtasks];
        newSubtasks[index].title = value;
        setSubtasks(newSubtasks);
    };

    const addSubtask = () => {
        setSubtasks([...subtasks, {title: '', isCompleted: false}]);
    };

    const removeSubtask = (index: number) => {
        const newSubtasks = subtasks.filter((_, i) => i !== index);
        setSubtasks(newSubtasks);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const filteredSubtasks = subtasks.filter(subtask => subtask.title.trim() !== '');

        const updatedTask: Task = {
            ...localTask,
            subtasks: filteredSubtasks,
        };

        if (isEditMode) {
            dispatch({
                type: UPDATE_TASK,
                payload: {
                    boardIndex: activeBoardIndex!,
                    columnName: columnName!,
                    taskIndex: taskIndex!,
                    updatedTask,
                },
            });
        } else {
            dispatch({
                type: ADD_TASK,
                payload: {
                    boardIndex: activeBoardIndex!,
                    columnName: localTask.status,
                    newTask: updatedTask,
                },
            });
        }

        closeTaskModal();
    };

    return (
        <div className="modal-overlay" onClick={closeTaskModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title-container">
                    {isEditMode ? (
                        <h1 className="heading-L">Edit Task</h1>
                    ) : (
                        <h1 className="heading-L">Add New Task</h1>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="input-item">
                            <label htmlFor="title" className="text-M grey-text">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="input-field text-L"
                                placeholder="e.g. Take coffee break"
                                value={localTask.title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="description" className="text-M grey-text">
                                Description
                            </label>
                            <textarea
                                id="description"
                                className="input-field text-area text-L"
                                placeholder="e.g. It’s always good to take a break..."
                                value={localTask.description}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                        <div className="subtask-form-container">
                            <label className="text-M grey-text">
                                Subtasks
                            </label>
                            <div className="subtask-input-container">
                                {subtasks.map((subtask, index) => (
                                    <AddEditSubtask
                                        key={index}
                                        index={index}
                                        value={subtask.title}
                                        onChange={handleSubtaskChange}
                                        onRemove={removeSubtask}
                                    />
                                ))}
                                <button
                                    type="button"
                                    className="add-subtask-btn text-M"
                                    onClick={addSubtask}
                                >
                                    + Add New Subtask
                                </button>
                            </div>
                        </div>
                        <div className="input-item">
                            <label htmlFor="status" className="text-M grey-text">
                                Status
                            </label>
                            <select
                                id="status"
                                className="input-field text-L"
                                value={localTask.status}
                                onChange={handleStatusChange}
                            >
                                {boards[activeBoardIndex!].columns.map((col, index) => (
                                    <option key={index} value={col.name}>
                                        {col.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-item">
                            <button type="submit" className="btn submit-btn text-L">
                                {isEditMode ? 'Save Changes' : 'Create Task'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditTask;
