/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Task } from "../types/kanbanTypes";
import "../styles/Board.css";

type TaskCardProps = {
	task: Task;
	openTaskModal: () => void;
};

const TaskCard = ({ task, openTaskModal }: TaskCardProps) => {
	const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted).length;

	
	return (
		<div className="task-card" onClick={openTaskModal}>
			<h3 className="heading-M">{task.title}</h3>
			<p className="sub-task-count text-M">
				{completedSubtasks} of {task.subtasks.length} subtasks
			</p>
		</div>
	);
};

export default TaskCard;
