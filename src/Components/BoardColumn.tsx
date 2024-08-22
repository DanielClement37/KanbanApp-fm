/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Column, Task } from "../types/kanbanTypes";
import "../styles/Board.css";
import TaskCard from "./TaskCard";

type BoardColumnProps = {
	column: Column;
	openTaskModal: (task: Task, column: Column) => void;
};

const BoardColumn = ({ column, openTaskModal }: BoardColumnProps) => {
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
					{column.name} ({column.tasks.length})
				</h4>
			</div>
			{column.tasks.map((task, index) => (
				<TaskCard key={index} task={task} openTaskModal={() => openTaskModal(task, column)} />
			))}
		</div>
	);
};

export default BoardColumn;
