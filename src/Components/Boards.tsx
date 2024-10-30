/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useContext, useMemo, useState} from "react";
import {AppContext} from "../stateManagement/context/AppContext";
import BoardColumn from "./BoardColumn";
import "../styles/Board.css";
import {REORDER_COLUMNS, SET_TASK_VIEW} from "../stateManagement/actions/actiontypes";
import ViewTask from "./Modals/ViewTask";
import AddColumn from "./Modals/AddColumn.tsx";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types/constants.ts'

const Boards = () => {
    const {state, dispatch} = useContext(AppContext);
    const {boards,columns} = state;
    const {activeBoardId, activeTaskId} = state.ui;
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);

    if (!activeBoardId) {
        return null;
    }

    const activeBoard = boards[activeBoardId];
    const columnOrder = activeBoard.columnOrder || [];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const columnsForActiveBoard = useMemo(() => {
        return columnOrder.map((columnId) => columns[columnId]).filter(Boolean);
    }, [columnOrder, columns]);

    // Implement the moveColumn function
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const moveColumn = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            if (dragIndex === hoverIndex) {
                return;
            }

            const newColumnOrder = [...columnOrder];
            const [removed] = newColumnOrder.splice(dragIndex, 1);
            newColumnOrder.splice(hoverIndex, 0, removed);

            // Dispatch action to update the board's columnOrder in state
            dispatch({
                type: REORDER_COLUMNS,
                payload: {
                    boardId: activeBoard.id,
                    columnOrder: newColumnOrder,
                },
            });
        },
        [columnOrder, dispatch, activeBoard.id]
    );

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
                {columnsForActiveBoard.map((column, index) => (
                    <BoardColumn
                        key={column.id}
                        column={column}
                        index={index}
                        moveColumn={moveColumn}
                        openTaskModal={openTaskModal}
                    />
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
