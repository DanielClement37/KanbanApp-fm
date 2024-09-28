import {Column, Task} from "../../types/kanbanTypes";

export const SET_ACTIVE_BOARD_INDEX = "SET_ACTIVE_BOARD_INDEX";
export const SET_TASK_VIEW = "SET_TASK_VIEW";
export const SET_SUBTASK_STATE = "SET_SUBTASK_STATE";
export const MOVE_TASK = "MOVE_TASK";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

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

export interface MoveTask {
    type: typeof MOVE_TASK;
    payload: {
        boardIndex: number;
        fromColumnIndex: number;
        toColumnIndex: number;
        taskIndex: number;
    };
}

export interface AddTaskAction {
    type: typeof ADD_TASK;
    payload: {
        boardIndex: number;
        columnName: string;
        newTask: Task;
    };
}

export interface UpdateTaskAction {
    type: typeof UPDATE_TASK;
    payload: {
        boardIndex: number;
        columnName: string;
        taskIndex: number;
        updatedTask: Task;
    };
}

export type Action =
    SetActiveBoardIndexAction
    | SetTaskViewAction
    | SetSubtaskState
    | MoveTask
    | AddTaskAction
    | UpdateTaskAction;