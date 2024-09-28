/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext} from "react";
import {AppContext} from "../stateManagement/context/AppContext";
import BoardColumn from "./BoardColumn";
import "../styles/Board.css";
import {Column, Task} from "../types/kanbanTypes";
import {SET_TASK_VIEW} from "../stateManagement/actions/actiontypes";
import ViewTask from "./Modals/ViewTask";

const Boards = () => {
    const {state, dispatch} = useContext(AppContext);
    const {boards, activeBoardIndex, activeTaskView} = state;
    const activeBoard = activeBoardIndex !== null ? boards[activeBoardIndex] : null;

    const openTaskModal = (task: Task, column: Column) => {
        dispatch({
            type: SET_TASK_VIEW,
            payload: {
                task,
                column,
            },
        });
    };

    const closeTaskModal = () => {
        dispatch({
            type: SET_TASK_VIEW,
            payload: {
                task: null,
                column: null,
            },
        });
    };

    return (
        <div className="board-container">
            {activeBoard && activeBoard.columns.map((column, index) => <BoardColumn key={index} column={column}
                                                                                    openTaskModal={openTaskModal}/>)}
            <div className="add-column-btn">
                <h2 className="heading-XL">+ New Column</h2>
            </div>
            {activeTaskView.task && activeTaskView.column &&
                <ViewTask currTask={activeTaskView.task} currColumn={activeTaskView.column}
                          closeTaskModal={closeTaskModal}/>}
        </div>
    );
};

export default Boards;
