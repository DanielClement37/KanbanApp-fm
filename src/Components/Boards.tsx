/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from "react";
import {AppContext} from "../stateManagement/context/AppContext";
import BoardColumn from "./BoardColumn";
import "../styles/Board.css";
import {SET_TASK_VIEW} from "../stateManagement/actions/actiontypes";
import ViewTask from "./Modals/ViewTask";
import AddColumn from "./Modals/AddColumn.tsx";

const Boards = () => {
    const {state, dispatch} = useContext(AppContext);
    const {columns} = state;
    const {activeBoardId, activeTaskId} = state.ui;
    const columnsForActiveBoard = activeBoardId
        ? Object.values(columns).filter((column) => column.boardId === activeBoardId)
        : [];
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);

    const openTaskModal = (taskId: string) => {
        dispatch({
            type: SET_TASK_VIEW,
            payload: taskId,
        });
    };

    const closeTaskModal = () => {
        dispatch({
            type: SET_TASK_VIEW,
            payload: null,
        });
    };

    return (
        <div className="boards-container">
            <div className="board-container">
                {columnsForActiveBoard.map((column) => (
                    <BoardColumn key={column.id} column={column} openTaskModal={openTaskModal}/>
                ))}
                <div className="add-column-btn" onClick={() => setShowAddColumnModal(true)}>
                    <h2 className="heading-XL">+ New Column</h2>
                </div>
                {activeTaskId && (
                    <ViewTask
                        taskId={activeTaskId}
                        closeTaskModal={closeTaskModal}
                    />
                )}
                {showAddColumnModal && (
                    <AddColumn closeModal={() => setShowAddColumnModal(false)}/>
                )}
            </div>
        </div>
    );
};

export default Boards;
