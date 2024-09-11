import React, {useContext, useEffect, useState} from "react";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import IconCheck from "../../assets/icon-check.svg";
import {Column, Task} from "../../types/kanbanTypes";
import "../../styles/ViewTask.css";
import {SET_SUBTASK_STATE, MOVE_TASK} from "../../stateManagement/actions/actiontypes";
import {AppContext} from "../../stateManagement/context/AppContext";

interface ViewTaskProps {
    currTask: Task;
    currColumn: Column;
    closeTaskModal: () => void;
}

const ViewTask = ({currTask, currColumn, closeTaskModal}: ViewTaskProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {boards, activeBoardIndex} = state;
    const boardIndex = activeBoardIndex!;
    const [localTask, setLocalTask] = useState(currTask);
    const [selectedColumn, setSelectedColumn] = useState(currColumn.name);

    // Recalculate columnIndex and taskIndex based on the current state
    const columnIndex = boards[boardIndex].columns.findIndex((column) => column.name === selectedColumn);
    const taskIndex = boards[boardIndex].columns[columnIndex]?.tasks.findIndex((task) => task.title === localTask.title);

    useEffect(() => {
        // Ensure the indices are valid before attempting to access the nested properties
        if (boardIndex !== null && columnIndex !== -1 && taskIndex !== -1) {
            setLocalTask(state.boards[boardIndex].columns[columnIndex].tasks[taskIndex]);
        }
    }, [state, boardIndex, columnIndex, taskIndex]);

    const handleToggleSubtask = (subtaskIndex: number) => {
        const isCompleted = !localTask.subtasks[subtaskIndex].isCompleted;
        dispatch({
            type: SET_SUBTASK_STATE,
            payload: {
                boardIndex,
                columnIndex,
                taskIndex,
                subtaskIndex,
                isCompleted,
            },
        });
    };

    const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColumnName = e.target.value;
        setSelectedColumn(newColumnName);

        // Check if the column is different from the current column
        if (newColumnName !== currColumn.name) {
            const toColumnIndex = boards[boardIndex].columns.findIndex(col => col.name === newColumnName);

            // Dispatch the move task action
            dispatch({
                type: MOVE_TASK,
                payload: {
                    boardIndex,
                    fromColumnIndex: columnIndex,
                    toColumnIndex,
                    taskIndex,
                },
            });
        }
    };

    const numCompletedSubtasks = localTask.subtasks.filter((subtask) => subtask.isCompleted).length;

    return (
        <div className="modal-overlay" onClick={closeTaskModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="task-title-container">
                    <h2 className="task-title heading-L">{localTask.title}</h2>
                    <div
                        className="elipsis-container"
                        onClick={() => {
                            // Toggle ellipsis menu (if needed)
                        }}
                    >
                        <img className="elipsis-btn" src={Ellipsis} alt="edit or delete task"/>
                    </div>
                </div>
                <p className="task-description body-L">{localTask.description}</p>
                <p className="sub-task-count text-M">
                    Subtasks ({numCompletedSubtasks} of {localTask.subtasks.length})
                </p>

                <ul className="subtasks-list">
                    {localTask.subtasks.map((subtask, index) => (
                        <li key={index} className="subtask-item">
                            <input
                                type="checkbox"
                                checked={subtask.isCompleted}
                                onChange={() => handleToggleSubtask(index)}
                                className="subtask-checkbox"
                                id={`subtask-${index}`}
                            />
                            <label htmlFor={`subtask-${index}`}
                                   className={`subtask-label text-M ${subtask.isCompleted ? "completed" : ""}`}>
                                {subtask.isCompleted && <img src={IconCheck} alt="Check" className="icon-check"/>}
                                {subtask.title}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="select-column-container">
                    <label className="text-M grey-text">Current Status</label>
                    <select id="column-select" className="select-status text-L" value={selectedColumn}
                            onChange={handleColumnChange}>
                        {boards[activeBoardIndex!].columns.map((col, index) => (
                            <option className="status-options" key={index} value={col.name}>
                                {col.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ViewTask;
