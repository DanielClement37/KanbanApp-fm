import React, {useContext} from 'react';
import {AppContext} from "../../stateManagement/context/AppContext.tsx";
import {generateUniqueId} from "../../Helpers/generateUUID.ts";

interface AddColumnProps {
    closeModal: () => void;
}

const AddColumn = ({closeModal}: AddColumnProps) => {
    const {state, dispatch} = useContext(AppContext);
    const [columnName, setColumnName] = React.useState('');


    const handleColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_COLUMN',
            payload: {
                id: generateUniqueId(),
                name: columnName,
                boardId: state.ui.activeBoardId!
            }
        })

        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title-container">
                    <h1 className="heading-L">Add New Column</h1>
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
                                placeholder="e.g. To do"
                                value={columnName}
                                onChange={handleColumnNameChange}
                                required={true}
                            />
                            <span className="error-text">Can't be empty</span>
                        </div>
                        <div className="input-item">
                            <button type="submit" className="btn submit-btn text-L">
                                Create Column
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddColumn;