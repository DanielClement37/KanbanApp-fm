// AddEditBoard.tsx
import React, {useContext, useEffect, useState} from 'react';
import {Board, Column} from "../../types/kanbanTypes";
import {AppContext} from "../../stateManagement/context/AppContext";
import AddEditListItem from "../FormComponents/AddEditListItem";
import {ADD_BOARD, ADD_COLUMN, DELETE_COLUMN, EDIT_BOARD, EDIT_COLUMN} from "../../stateManagement/actions/actiontypes";
import {generateUniqueId} from "../../Helpers/generateUUID.ts";

interface AddEditBoardProps {
    closeModal: () => void;
    isEditMode: boolean;
    boardId?: string;
}

const AddEditBoard = ({closeModal, isEditMode, boardId}: AddEditBoardProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {boards, columns} = state;

    const initialBoardState: Board = isEditMode && boardId && boards[boardId]
        ? boards[boardId]
        : {
            id: '',
            name: '',
        };

    const [localBoard, setLocalBoard] = useState<Board>(initialBoardState);
    const [columnsForBoard, setColumnsForBoard] = useState<Column[]>([]);
    const [errors, setErrors] = useState({
        name: '',
        columns: [] as string[],
    });
    const [deletedColumnIds, setDeletedColumnIds] = useState<string[]>([]);

    useEffect(() => {
        if (isEditMode && boardId) {
            const existingColumns = Object.values(columns).filter(
                (col) => col.boardId === boardId
            );
            setColumnsForBoard(existingColumns);
            setErrors((prevErrors) => ({
                ...prevErrors,
                columns: existingColumns.map(() => ''),
            }));
        } else {
            const initialColumns = [{id: '', name: '', boardId: ''}];
            setColumnsForBoard(initialColumns);
            setErrors((prevErrors) => ({
                ...prevErrors,
                columns: initialColumns.map(() => ''),
            }));
        }
    }, [isEditMode, boardId, columns]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalBoard({...localBoard, name: e.target.value});
    };

    const handleNameBlur = () => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: localBoard.name.trim() ? '' : "Can't be empty",
        }));
    };

    const handleColumnChange = (index: number, value: string) => {
        const newColumns = [...columnsForBoard];
        newColumns[index].name = value;
        setColumnsForBoard(newColumns);
    };

    const addColumn = () => {
        setColumnsForBoard([...columnsForBoard, {id: '', name: '', boardId: ''}]);
        setErrors((prevErrors) => ({
            ...prevErrors,
            columns: [...prevErrors.columns, ''],
        }));
    };

    const handleColumnRemove = (index: number) => {
        const columnToRemove = columnsForBoard[index];

        if (columnToRemove.id) {
            setDeletedColumnIds([...deletedColumnIds, columnToRemove.id]);
        }

        const newColumns = columnsForBoard.filter((_, i) => i !== index);
        setColumnsForBoard(newColumns);

        const newColumnErrors = errors.columns.filter((_, i) => i !== index);
        setErrors((prevErrors) => ({
            ...prevErrors,
            columns: newColumnErrors,
        }));
    };
    const handleColumnBlur = (index: number) => {
        setErrors((prevErrors) => {
            const newColumnErrors = [...prevErrors.columns];
            newColumnErrors[index] = columnsForBoard[index].name.trim() ? '' : "Can't be empty";
            return {
                ...prevErrors,
                columns: newColumnErrors,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = {name: '', columns: [] as string[]};

        if (!localBoard.name.trim()) {
            newErrors.name = "Can't be empty";
            hasErrors = true;
        }

        newErrors.columns = columnsForBoard.map((column) => {
            if (!column.name.trim()) {
                hasErrors = true;
                return "Can't be empty";
            }
            return '';
        });

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

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
            deletedColumnIds.forEach((columnId) => {
                dispatch({
                    type: DELETE_COLUMN,
                    payload: {
                        columnId,
                    },
                });
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
                            <div className="input-field-container">
                                <input
                                    type="text"
                                    id="name"
                                    className={`input-field text-L ${errors.name ? 'input-field--error' : ''}`}
                                    placeholder="e.g. Web Design"
                                    value={localBoard.name}
                                    onChange={handleNameChange}
                                    onBlur={handleNameBlur}
                                />
                                {errors.name && (
                                    <span className="input-error-message text-M">{errors.name}</span>
                                )}
                            </div>
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
                                        onBlur={() => handleColumnBlur(index)}
                                        onRemove={handleColumnRemove}
                                        error={errors.columns[index]}
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
