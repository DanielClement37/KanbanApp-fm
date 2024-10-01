import React, { useContext, useState } from 'react';
import { Board } from "../../types/kanbanTypes";
import { AppContext } from "../../stateManagement/context/AppContext";
import AddEditListItem from "../FormComponents/AddEditListItem.tsx";


interface AddEditBoardProps {
    closeModal: () => void;
    isEditMode: boolean;
    board?: Board;
}

const AddEditBoard = ({ closeModal, isEditMode, board }: AddEditBoardProps) => {
    const { state, dispatch } = useContext(AppContext);
    const { activeBoardIndex } = state;


    const initialBoardState: Board = isEditMode && board ? board : {
        name: '',
        columns: [
            { name: '', tasks: [] }
        ],
    };

    const [localBoard, setLocalBoard] = useState<Board>(initialBoardState);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalBoard({ ...localBoard, name: e.target.value });
    };

    const handleColumnChange = (index: number, value: string) => {
        const newColumns = [...localBoard.columns];
        newColumns[index].name = value;
        setLocalBoard({ ...localBoard, columns: newColumns });
    };

    const addColumn = () => {
        setLocalBoard({
            ...localBoard,
            columns: [...localBoard.columns, { name: '', tasks: [] }],
        });
    };

    const handleColumnRemove = (index: number) => {
        const newColumns = localBoard.columns.filter((_, i) => i !== index);
        setLocalBoard({ ...localBoard, columns: newColumns });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            dispatch({
                type: 'EDIT_BOARD',
                payload: {
                    boardIndex: activeBoardIndex!,
                    board: localBoard,
                },
            });
        } else {
            dispatch({
                type: 'ADD_BOARD',
                payload: localBoard,
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
                            <label className="text-M grey-text">
                                Columns
                            </label>
                            <div className="list-input-container">
                                {localBoard.columns.map((column, index) => (
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
