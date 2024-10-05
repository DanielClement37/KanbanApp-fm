import {Column} from "../../types/kanbanTypes";
import {Action, ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN} from "../actions/actiontypes";

export interface ColumnsState {
    [id: string]: Column;
}

export const columnsReducer = (state: ColumnsState = {}, action: Action): ColumnsState => {
    switch (action.type) {
        case ADD_COLUMN: {
            const newColumn = action.payload;
            return {
                ...state,
                [newColumn.id]: newColumn,
            };
        }
        case EDIT_COLUMN: {
            const updatedColumn = action.payload;
            return {
                ...state,
                [updatedColumn.id]: updatedColumn,
            };
        }
        case DELETE_COLUMN: {
            const { columnId } = action.payload;
            const { [columnId]: deletedColumn, ...remainingColumns } = state;
            return remainingColumns;
        }

        default:
            return state;
    }
};