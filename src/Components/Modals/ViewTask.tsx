// ViewTask.tsx
import React, {useContext, useState} from "react";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import IconCheck from "../../assets/icon-check.svg";
import "../../styles/ViewTask.css";
import "../../styles/EllipseMenu.css"
import {SET_SUBTASK_STATE, MOVE_TASK} from "../../stateManagement/actions/actiontypes";
import {AppContext} from "../../stateManagement/context/AppContext";
import EllipseMenu from "./EllipseMenu";
import AddEditTask from "./AddEditTask";

interface ViewTaskProps {
    taskId: string;
    closeTaskModal: () => void;
}

const ViewTask = ({taskId, closeTaskModal}: ViewTaskProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {tasks, columns, subtasks} = state;
    const {activeBoardId} = state.ui;

    const task = tasks[taskId];
    const column = columns[task.columnId];

    const [selectedColumnId, setSelectedColumnId] = useState(task.columnId);
    const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    if (!task || !column) {
        return null;
    }
    const subtasksForTask = Object.values(subtasks).filter((subtask) => subtask.taskId === taskId);
    const numCompletedSubtasks = subtasksForTask.filter((subtask) => subtask.isCompleted).length;

    const handleToggleSubtask = (subtaskId: string) => {
        const subtask = subtasks[subtaskId];
        if (subtask) {
            dispatch({
                type: SET_SUBTASK_STATE,
                payload: {
                    subtaskId,
                    isCompleted: !subtask.isCompleted,
                },
            });
        }
    };

    const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColumnId = e.target.value;

        if (newColumnId !== task.columnId) {
            // Dispatch the move task action
            dispatch({
                type: MOVE_TASK,
                payload: {
                    taskId,
                    fromColumnId: task.columnId,
                    toColumnId: newColumnId,
                },
            });
            setSelectedColumnId(newColumnId);
        }
    };

    const handleDeleteTask = () => {
        dispatch({
            type: "DELETE_TASK",
            payload: {
                taskId
            }
        });
        closeTaskModal();
    }

    // Get columns for the active board
    const columnsForBoard = Object.values(columns).filter((col) => col.boardId === activeBoardId);

    return (
        <>
            <div className="modal-overlay" onClick={closeTaskModal}>
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                    <div className="task-title-container">
                        <h2 className="task-title heading-L">{task.title}</h2>
                        <div
                            className="ellipsis-container"
                            onClick={() => {
                                setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
                            }}
                        >
                            <img className="ellipsis-btn" src={Ellipsis} alt="edit or delete task"/>
                        </div>
                    </div>
                    {isEllipsisMenuOpen && (
                        <EllipseMenu
                            type="task"
                            item={task}
                            id={taskId}
                            onEdit={() => {
                                setIsEditMode(true);
                                setIsEllipsisMenuOpen(false);
                            }}
                            onDelete={() => {
                                handleDeleteTask()
                            }}
                        />
                    )}
                    <p className="task-description body-L">{task.description}</p>
                    <p className="sub-task-count text-M">
                        Subtasks ({numCompletedSubtasks} of {subtasksForTask.length})
                    </p>

                    <ul className="subtasks-list">
                        {subtasksForTask.map((subtask) => (
                            <li key={subtask.id} className="subtask-item">
                                <input
                                    type="checkbox"
                                    checked={subtask.isCompleted}
                                    onChange={() => handleToggleSubtask(subtask.id)}
                                    className="subtask-checkbox"
                                    id={`subtask-${subtask.id}`}
                                />
                                <label
                                    htmlFor={`subtask-${subtask.id}`}
                                    className={`subtask-label text-M ${subtask.isCompleted ? "completed" : ""}`}
                                >
                                    {subtask.isCompleted && <img src={IconCheck} alt="Check" className="icon-check"/>}
                                    {subtask.title}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className="select-column-container">
                        <label className="text-M grey-text">Current Status</label>
                        <select
                            id="column-select"
                            className="select-status text-L"
                            value={selectedColumnId}
                            onChange={handleColumnChange}
                        >
                            {columnsForBoard.map((col) => (
                                <option className="status-options" key={col.id} value={col.id}>
                                    {col.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {isEditMode && (
                <AddEditTask
                    closeTaskModal={() => setIsEditMode(false)}
                    isEditMode={true}
                    taskId={taskId}
                />
            )}
        </>
    );
};

export default ViewTask;
