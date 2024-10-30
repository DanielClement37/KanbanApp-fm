import { Board } from "../../types/kanbanTypes";
import {Action, ADD_BOARD, EDIT_BOARD, DELETE_BOARD, REORDER_COLUMNS} from "../actions/actiontypes";

export interface BoardsState {
    [id: string]: Board;
}

export const boardsReducer = (state: BoardsState = {}, action: Action): BoardsState => {
    switch (action.type) {
        case ADD_BOARD: {
            const newBoard = action.payload;
            return {
                ...state,
                [newBoard.id]: newBoard,
            };
        }
        case EDIT_BOARD: {
            const updatedBoard = action.payload;
            return {
                ...state,
                [updatedBoard.id]: updatedBoard,
            };
        }
        case DELETE_BOARD: {
            const { boardId } = action.payload;
            const { [boardId]: deletedBoard, ...remainingBoards } = state;
            return remainingBoards;
        }
        case REORDER_COLUMNS: {
            const { boardId, columnOrder } = action.payload;
            return {
                ...state,
                [boardId]: {
                    ...state[boardId],
                    columnOrder,
                },
            };
        }
        default:
            return state;
    }
};
