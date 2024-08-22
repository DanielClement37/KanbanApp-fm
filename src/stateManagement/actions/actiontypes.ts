import { Column, Task } from "../../types/kanbanTypes";

export const SET_ACTIVE_BOARD_INDEX = "SET_ACTIVE_BOARD_INDEX";
export const SET_TASK_VIEW = "SET_TASK_VIEW";
export const SET_SUBTASK_STATE = "SET_SUBTASK_STATE";

export interface SetActiveBoardIndexAction {
    type: typeof SET_ACTIVE_BOARD_INDEX;
    payload: number;
}

export interface SetTaskViewAction {
    type: typeof SET_TASK_VIEW;
    payload: {
        task: Task | null;
        column: Column | null;
    };
}

export interface SetSubtaskState {
    type: typeof SET_SUBTASK_STATE;
    payload: {
        boardIndex: number;
        columnIndex: number;
        taskIndex: number;
        subtaskIndex: number;
        isCompleted: boolean;
    };
}

export type Action = SetActiveBoardIndexAction | SetTaskViewAction | SetSubtaskState;