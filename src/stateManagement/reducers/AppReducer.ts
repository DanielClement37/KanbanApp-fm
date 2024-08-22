import { Board, Column, Task } from "../../types/kanbanTypes";
import GivenState from "../../json/data.json";
import { Action, SET_ACTIVE_BOARD_INDEX, SET_SUBTASK_STATE, SET_TASK_VIEW } from "../actions/actiontypes";

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
		case SET_SUBTASK_STATE:{
			const { boardIndex, columnIndex, taskIndex, subtaskIndex, isCompleted } = action.payload;

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

										return { ...subtask, isCompleted };
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
		default:
			return state;
	}
};
