// AddEditBoard.tsx
import React, { useContext, useState, useEffect } from 'react';
import { Board, Column } from "../../types/kanbanTypes";
import { AppContext } from "../../stateManagement/context/AppContext";
import AddEditListItem from "../FormComponents/AddEditListItem";
import { ADD_BOARD, EDIT_BOARD, ADD_COLUMN, EDIT_COLUMN } from "../../stateManagement/actions/actiontypes";
import {generateUniqueId} from "../../Helpers/generateUUID.ts";

interface AddEditBoardProps {
    closeModal: () => void;
    isEditMode: boolean;
    boardId?: string;
}

const AddEditBoard = ({ closeModal, isEditMode, boardId }: AddEditBoardProps) => {
    const { state, dispatch } = useContext(AppContext);
    const { boards, columns } = state;

    const initialBoardState: Board = isEditMode && boardId && boards[boardId]
        ? boards[boardId]
        : {
            id: '',
            name: '',
        };

    const [localBoard, setLocalBoard] = useState<Board>(initialBoardState);
    const [columnsForBoard, setColumnsForBoard] = useState<Column[]>([]);

    useEffect(() => {
        if (isEditMode && boardId) {
            const existingColumns = Object.values(columns).filter((col) => col.boardId === boardId);
            setColumnsForBoard(existingColumns);
        } else {
            setColumnsForBoard([
                { id: '', name: '', boardId: '' },
            ]);
        }
    }, [isEditMode, boardId, columns]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalBoard({ ...localBoard, name: e.target.value });
    };

    const handleColumnChange = (index: number, value: string) => {
        const newColumns = [...columnsForBoard];
        newColumns[index].name = value;
        setColumnsForBoard(newColumns);
    };

    const addColumn = () => {
        setColumnsForBoard([...columnsForBoard, { id: '', name: '', boardId: '' }]);
    };

    const handleColumnRemove = (index: number) => {
        const newColumns = columnsForBoard.filter((_, i) => i !== index);
        setColumnsForBoard(newColumns);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode && boardId) {
            // Update board
            dispatch({
                type: EDIT_BOARD,
                payload: {
                    ...localBoard,
                },
            });

            // Update columns
            columnsForBoard.forEach((col) => {
                if (col.id) {
                    dispatch({
                        type: EDIT_COLUMN,
                        payload: col,
                    });
                } else {
                    const newColumnId = generateUniqueId();
                    dispatch({
                        type: ADD_COLUMN,
                        payload: {
                            ...col,
                            id: newColumnId,
                            boardId,
                        },
                    });
                }
            });
        } else {
            // Add new board
            const newBoardId = generateUniqueId();
            const newBoard: Board = {
                ...localBoard,
                id: newBoardId,
            };

            dispatch({
                type: ADD_BOARD,
                payload: newBoard,
            });

            // Add new columns
            columnsForBoard.forEach((col) => {
                const newColumnId = generateUniqueId();
                dispatch({
                    type: ADD_COLUMN,
                    payload: {
                        ...col,
                        id: newColumnId,
                        boardId: newBoardId,
                    },
                });
            });
        }

        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title-container">
                    {isEditMode ? (
                        <h1 className="heading-L">Edit Board</h1>
                    ) : (
                        <h1 className="heading-L">Add New Board</h1>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="input-item">
                            <label htmlFor="title" className="text-M grey-text">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="input-field text-L"
                                placeholder="e.g. Web Design"
                                value={localBoard.name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="list-form-container">
                            <label className="text-M grey-text">Columns</label>
                            <div className="list-input-container">
                                {columnsForBoard.map((column, index) => (
                                    <AddEditListItem
                                        key={index}
                                        index={index}
                                        value={column.name}
                                        placeholder="e.g. Todo"
                                        onChange={handleColumnChange}
                                        onRemove={handleColumnRemove}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="add-list-item-btn text-M"
                                onClick={addColumn}
                            >
                                + Add New Column
                            </button>
                        </div>
                        <div className="input-item">
                            <button type="submit" className="btn submit-btn text-L">
                                {isEditMode ? 'Save Changes' : 'Create Board'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditBoard;
