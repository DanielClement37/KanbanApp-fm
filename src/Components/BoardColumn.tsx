import React, { useState, useContext } from "react";
import "../styles/Board.css";
import TaskCard from "./TaskCard";
import { AppContext } from "../stateManagement/context/AppContext";
import { Column } from "../types/kanbanTypes";

type BoardColumnProps = {
	column: Column;
	openTaskModal: (taskId: string) => void;
};

const BoardColumn = ({ column, openTaskModal }: BoardColumnProps) => {
	const { state } = useContext(AppContext);
	const { tasks } = state;

	const tasksForColumn = Object.values(tasks).filter((task) => task.columnId === column.id);

	const generateRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const [columnColor] = useState(generateRandomColor);

	return (
		<div className="column-container">
			<div className="column-name-container">
				<div className="column-color" style={{ backgroundColor: columnColor }} />
				<h4 className="column-name text-M ">
					{column.name} ({tasksForColumn.length})
				</h4>
			</div>
			{tasksForColumn.map((task) => (
				<TaskCard key={task.id} task={task} openTaskModal={() => openTaskModal(task.id)} />
			))}
		</div>
	);
};

export default BoardColumn;
