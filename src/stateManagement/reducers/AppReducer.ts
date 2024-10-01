// appReducer.ts
import {Board, Column, Task} from "../../types/kanbanTypes";
import GivenState from "../../json/data.json";
import {
    Action, ADD_BOARD,
    ADD_TASK, DELETE_BOARD, EDIT_BOARD,
    MOVE_TASK,
    SET_ACTIVE_BOARD_INDEX,
    SET_SUBTASK_STATE,
    SET_TASK_VIEW,
    UPDATE_TASK,
} from "../actions/actiontypes";

export interface AppState {
    isDarkMode: boolean;
    isSidebarVisible: boolean;
    boards: Board[];
    activeBoardIndex: number | null;
    activeTaskView: {
        task: Task | null;
        column: Column | null;
    };
}

export const initialState: AppState = {
    isDarkMode: false,
    isSidebarVisible: true,
    boards: GivenState.boards,
    activeBoardIndex: 0,
    activeTaskView: {
        task: null,
        column: null,
    },
};

export const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case SET_ACTIVE_BOARD_INDEX:
            return {
                ...state,
                activeBoardIndex: action.payload,
            };
        case SET_TASK_VIEW:
            return {
                ...state,
                activeTaskView: action.payload,
            };
        case SET_SUBTASK_STATE: {
            const {boardIndex, columnIndex, taskIndex, subtaskIndex, isCompleted} =
                action.payload;

            const updatedBoards = state.boards.map((board, bIndex) => {
                if (bIndex !== boardIndex) return board;

                return {
                    ...board,
                    columns: board.columns.map((column, cIndex) => {
                        if (cIndex !== columnIndex) return column;

                        return {
                            ...column,
                            tasks: column.tasks.map((task, tIndex) => {
                                if (tIndex !== taskIndex) return task;

                                return {
                                    ...task,
                                    subtasks: task.subtasks.map((subtask, sIndex) => {
                                        if (sIndex !== subtaskIndex) return subtask;

                                        return {...subtask, isCompleted};
                                    }),
                                };
                            }),
                        };
                    }),
                };
            });
            return {
                ...state,
                boards: updatedBoards,
            };
        }

        case MOVE_TASK: {
            const {boardIndex, fromColumnIndex, toColumnIndex, taskIndex} =
                action.payload;

            const taskToMove =
                state.boards[boardIndex].columns[fromColumnIndex].tasks[taskIndex];

            const updatedBoards = state.boards.map((board, bIndex) => {
                if (bIndex !== boardIndex) return board;

                return {
                    ...board,
                    columns: board.columns.map((column, cIndex) => {
                        if (cIndex === fromColumnIndex) {
                            return {
                                ...column,
                                tasks: column.tasks.filter((_, tIndex) => tIndex !== taskIndex),
                            };
                        }
                        if (cIndex === toColumnIndex) {
                            return {
                                ...column,
                                tasks: [...column.tasks, taskToMove],
                            };
                        }
                        return column;
                    }),
                };
            });

            return {
                ...state,
                boards: updatedBoards,
            };
        }

        case ADD_TASK: {
            const {boardIndex, columnName, newTask} = action.payload;

            const updatedBoards = state.boards.map((board, bIndex) => {
                if (bIndex !== boardIndex) return board;

                return {
                    ...board,
                    columns: board.columns.map((column) => {
                        if (column.name !== columnName) return column;

                        return {
                            ...column,
                            tasks: [...column.tasks, newTask],
                        };
                    }),
                };
            });

            return {
                ...state,
                boards: updatedBoards,
            };
        }

        case UPDATE_TASK: {
            const {boardIndex, updatedTask} = action.payload;

            const board = state.boards[boardIndex];

            // Find the original column and task indices
            let fromColumnIndex = -1;
            let taskIndex = -1;
            board.columns.forEach((column, colIndex) => {
                const index = column.tasks.findIndex((task) => task.title === updatedTask.title);
                if (index !== -1) {
                    fromColumnIndex = colIndex;
                    taskIndex = index;
                }
            });

            if (fromColumnIndex === -1 || taskIndex === -1) {
                return state; // Task not found
            }

            // Determine the new column index based on the updated task status
            const toColumnIndex = board.columns.findIndex((col) => col.name === updatedTask.status);

            // If the status hasn't changed, simply update the task
            if (fromColumnIndex === toColumnIndex) {
                const updatedBoards = state.boards.map((board, bIndex) => {
                    if (bIndex !== boardIndex) return board;

                    return {
                        ...board,
                        columns: board.columns.map((column, cIndex) => {
                            if (cIndex !== fromColumnIndex) return column;

                            return {
                                ...column,
                                tasks: column.tasks.map((task, tIndex) => {
                                    if (tIndex !== taskIndex) return task;
                                    return updatedTask;
                                }),
                            };
                        }),
                    };
                });

                return {
                    ...state,
                    boards: updatedBoards,
                };
            } else {
                // If the status has changed, move the task to the new column
                const taskToMove = updatedTask;

                const updatedBoards = state.boards.map((board, bIndex) => {
                    if (bIndex !== boardIndex) return board;

                    return {
                        ...board,
                        columns: board.columns.map((column, cIndex) => {
                            if (cIndex === fromColumnIndex) {
                                return {
                                    ...column,
                                    tasks: column.tasks.filter((_, tIndex) => tIndex !== taskIndex),
                                };
                            }
                            if (cIndex === toColumnIndex) {
                                return {
                                    ...column,
                                    tasks: [...column.tasks, taskToMove],
                                };
                            }
                            return column;
                        }),
                    };
                });

                return {
                    ...state,
                    boards: updatedBoards,
                };
            }
        }
        case ADD_BOARD: {
            const newBoards = [...state.boards, action.payload];
            return {
                ...state,
                boards: newBoards,
            };
        }

        case EDIT_BOARD: {
            const {boardIndex, updatedBoard} = action.payload;
            const newBoards = state.boards.map((board, index) =>
                index === boardIndex ? updatedBoard : board
            );
            return {
                ...state,
                boards: newBoards,
            };
        }

        case DELETE_BOARD: {
            const {boardIndex} = action.payload;
            const newBoards = state.boards.filter((_, index) => index !== boardIndex);
            let newActiveBoardIndex = state.activeBoardIndex;

            // Adjust activeBoardIndex if necessary
            if (state.activeBoardIndex !== null) {
                if (state.activeBoardIndex === boardIndex) {
                    // If the deleted board was the active one, reset to first board or null
                    newActiveBoardIndex = state.boards.length > 1 ? 0 : null;
                } else if (state.activeBoardIndex > boardIndex) {
                    // Decrement activeBoardIndex if it was after the deleted board
                    newActiveBoardIndex = state.activeBoardIndex - 1;
                }
            }

            return {
                ...state,
                boards: newBoards,
                activeBoardIndex: newActiveBoardIndex,
            };
        }
        default:
            return state;
    }
};
