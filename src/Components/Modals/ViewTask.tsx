import React, { useContext, useEffect, useState } from "react";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import IconCheck from "../../assets/icon-check.svg";
import { Column, Task } from "../../types/kanbanTypes";
import "../../styles/ViewTask.css";
import { SET_SUBTASK_STATE } from "../../stateManagement/actions/actiontypes";
import { AppContext } from "../../stateManagement/context/AppContext";

interface ViewTaskProps {
	currTask: Task;
	currColumn: Column;
	closeTaskModal: () => void; // To close the modal when clicking outside
}

const ViewTask = ({ currTask, currColumn, closeTaskModal }: ViewTaskProps) => {
	const { state, dispatch } = useContext(AppContext); // Use the context

	const boardIndex = state.activeBoardIndex!;
	const columnIndex = state.boards[boardIndex].columns.findIndex(column => column.name === currColumn.name);
	const taskIndex = state.boards[boardIndex].columns[columnIndex]?.tasks.findIndex(task => task.title === currTask.title);

	const [localTask, setLocalTask] = useState(currTask);

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

	const numCompletedSubtasks = localTask.subtasks.filter((subtask) => subtask.isCompleted).length;

	return (
		<div className="modal-overlay" onClick={closeTaskModal}>
			<div className="view-task-card" onClick={(e) => e.stopPropagation()}>
				<div className="task-title-container">
					<h2 className="task-title heading-L">{localTask.title}</h2>
					<div
						className="elipsis-container"
						onClick={() => {
							// Handle ellipsis click if needed
						}}
					>
						<img className="elipsis-btn" src={Ellipsis} alt="edit or delete task" />
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
							<label htmlFor={`subtask-${index}`} className={`subtask-label text-M ${subtask.isCompleted ? "completed" : ""}`}>
								{subtask.isCompleted && <img src={IconCheck} alt="Check" className="icon-check" />}
								{subtask.title}
							</label>
						</li>
					))}
				</ul>
				<h4>{currColumn.name}</h4>
			</div>
		</div>
	);
};

export default ViewTask;
