/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Column } from "../types/kanbanTypes";
import "../styles/Board.css";
import TaskCard from "./TaskCard";

type BoardColumnProps = {
	column: Column;
};

const BoardColumn = ({ column }: BoardColumnProps) => {
    const randomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="column-container">
            <div className="column-name-container">
                <div className="column-color" style={{ backgroundColor: randomColor() }}/>
                <h4 className="column-name text-M ">{column.name} ({column.tasks.length})</h4>
            </div>
            {column.tasks.map((task, index) => (
                <TaskCard key={index} task={task} />
            ))}
        </div>
    );
};

export default BoardColumn;
