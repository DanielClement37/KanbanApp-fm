import React, {useContext, useEffect, useState} from "react";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import IconCheck from "../../assets/icon-check.svg";
import {Column, Task} from "../../types/kanbanTypes";
import "../../styles/ViewTask.css";
import {SET_SUBTASK_STATE, MOVE_TASK} from "../../stateManagement/actions/actiontypes";
import {AppContext} from "../../stateManagement/context/AppContext";
import ElipseMenu from "./ElipseMenu.tsx";
import AddEditTask from "./AddEditTask.tsx";

interface ViewTaskProps {
    currTask: Task;
    currColumn: Column;
    closeTaskModal: () => void;
}
const ViewTask = ({currTask, closeTaskModal}: ViewTaskProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {boards, activeBoardIndex} = state;
    const boardIndex = activeBoardIndex!;

    const [localTask, setLocalTask] = useState(currTask);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
    const [columnIndex, setColumnIndex] = useState<number>(-1);
    const [taskIndex, setTaskIndex] = useState<number>(-1);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        let foundColumnIndex = -1;
        let foundTaskIndex = -1;

        for (let i = 0; i < boards[boardIndex].columns.length; i++) {
            const column = boards[boardIndex].columns[i];
            const index = column.tasks.findIndex((task) => task.title === localTask.title);
            if (index !== -1) {
                foundColumnIndex = i;
                foundTaskIndex = index;
                break;
            }
        }

        if (foundColumnIndex !== -1 && foundTaskIndex !== -1) {
            setColumnIndex(foundColumnIndex);
            setTaskIndex(foundTaskIndex);
            setLocalTask(state.boards[boardIndex].columns[foundColumnIndex].tasks[foundTaskIndex]);
            setSelectedColumn(boards[boardIndex].columns[foundColumnIndex].name);
        }
    }, [state, boardIndex, localTask.title, boards]);

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


        // Find the index of the new column
        const toColumnIndex = boards[boardIndex].columns.findIndex((col) => col.name === newColumnName);

        if (toColumnIndex !== -1 && columnIndex !== -1) {
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

        setSelectedColumn(newColumnName);
    };

    const numCompletedSubtasks = localTask.subtasks.filter((subtask) => subtask.isCompleted).length;

    return (
        <>
            <div className="modal-overlay" onClick={closeTaskModal}>
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                    <div className="task-title-container">
                        <h2 className="task-title heading-L">{localTask.title}</h2>
                        <div
                            className="elipsis-container"
                            onClick={() => {
                                setIsElipsisMenuOpen(!isElipsisMenuOpen);
                            }}
                        >
                            <img className="elipsis-btn" src={Ellipsis} alt="edit or delete task"/>
                        </div>
                    </div>
                    {isElipsisMenuOpen && <ElipseMenu
                        type={"task"}
                        item={localTask}
                        index={activeBoardIndex!}
                        onEdit={() => {
                            setIsEditMode(true);
                            setIsElipsisMenuOpen(false);
                        }}
                    />}
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
                                <label
                                    htmlFor={`subtask-${index}`}
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
                            value={selectedColumn}
                            onChange={handleColumnChange}
                        >
                            {boards[activeBoardIndex!].columns.map((col, index) => (
                                <option className="status-options" key={index} value={col.name}>
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
                    task={localTask}
                    columnName={selectedColumn}
                    taskIndex={taskIndex}
                />
            )}
        </>
    );
};

export default ViewTask;
