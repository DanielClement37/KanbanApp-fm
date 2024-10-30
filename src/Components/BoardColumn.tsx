import React, {useState, useContext, useEffect, useRef} from "react";
import "../styles/Board.css";
import TaskCard from "./TaskCard";
import {AppContext} from "../stateManagement/context/AppContext";
import {Column} from "../types/kanbanTypes";
import {useDrag, useDrop} from 'react-dnd';
import { ItemTypes } from '../types/constants';

type BoardColumnProps = {
    column: Column;
    index: number;
    moveColumn: (dragIndex: number, hoverIndex: number) => void;
    openTaskModal: (taskId: string) => void;
};

const BoardColumn = ({column,index,moveColumn, openTaskModal}: BoardColumnProps) => {
    const {state} = useContext(AppContext);
    const {tasks} = state;
    const tasksForColumn = Object.values(tasks).filter((task) => task.columnId === column.id);

    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getColumnColor = () => {
        const storedColor = localStorage.getItem(`columnColor-${column.id}`);
        if (storedColor) {
            return storedColor;
        } else {
            const newColor = generateRandomColor();
            localStorage.setItem(`columnColor-${column.id}`, newColor);
            return newColor;
        }
    };

    const [columnColor, setColumnColor] = useState<string>("");

    useEffect(() => {
        setColumnColor(getColumnColor());
    }, []);

    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        hover(item: { id: string; index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }

            // Get pixels to the left
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;

            // Only perform the move when the mouse has crossed half of the item's width
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            // Perform the move
            moveColumn(dragIndex, hoverIndex);

            // Note: Mutating the monitor item here!
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.COLUMN,
        item: { id: column.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={`column-container ${isDragging ? 'dragging' : ''}`}>
            <div className="column-header-container">
                <div className="column-name-container">
                    <div className="column-color" style={{backgroundColor: columnColor}}/>
                    <h4 className="column-name text-M ">
                        {column.name} ({tasksForColumn.length})
                    </h4>
                </div>
                <div className="drag-n-drop-icon">
                    <svg width="30px" height="30px" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <g id="Interface / Drag_Vertical">
                            <g id="Vector">
                                <path
                                    d="M14 18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17C14.4477 17 14 17.4477 14 18Z"
                                    stroke="currentColor " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18Z"
                                    stroke="currentColor " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12Z"
                                    stroke="currentColor " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M8 12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12Z"
                                    stroke="currentColor " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M14 6C14 6.55228 14.4477 7 15 7C15.5523 7 16 6.55228 16 6C16 5.44772 15.5523 5 15 5C14.4477 5 14 5.44772 14 6Z"
                                    stroke="currentColor " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M8 6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6Z"
                                    stroke="currentColor " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            {tasksForColumn.map((task) => (
                <TaskCard key={task.id} task={task} openTaskModal={() => openTaskModal(task.id)}/>
            ))}
        </div>
    );
};

export default React.memo(BoardColumn);
