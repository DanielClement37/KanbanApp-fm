import { Board, Column, Task } from "../../types/kanbanTypes";

// Action Type Constants
export const SET_ACTIVE_BOARD_ID = "SET_ACTIVE_BOARD_ID";
export const SET_SIDEBAR_VISIBILITY = "SET_SIDEBAR_VISIBILITY";
export const SET_TASK_VIEW = "SET_TASK_VIEW";
export const SET_SUBTASK_STATE = "SET_SUBTASK_STATE";
export const MOVE_TASK = "MOVE_TASK";
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const ADD_BOARD = "ADD_BOARD";
export const EDIT_BOARD = "EDIT_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const ADD_COLUMN = "ADD_COLUMN";
export const EDIT_COLUMN = "EDIT_COLUMN";
export const DELETE_COLUMN = "DELETE_COLUMN";

// Action Interfaces

export interface SetActiveBoardIdAction {
    type: typeof SET_ACTIVE_BOARD_ID;
    payload: string;
}

export interface SetSidebarVisibilityAction {
    type: typeof SET_SIDEBAR_VISIBILITY;
    payload: boolean;
}

export interface SetTaskViewAction {
    type: typeof SET_TASK_VIEW;
    payload: string | null;
}

export interface SetSubtaskStateAction {
    type: typeof SET_SUBTASK_STATE;
    payload: {
        subtaskId: string;
        isCompleted: boolean;
    };
}

export interface MoveTaskAction {
    type: typeof MOVE_TASK;
    payload: {
        taskId: string;
        fromColumnId: string;
        toColumnId: string;
    };
}

export interface AddTaskAction {
    type: typeof ADD_TASK;
    payload: Task;
}

export interface EditTaskAction {
    type: typeof EDIT_TASK;
    payload: Task;
}

export interface DeleteTaskAction {
    type: typeof DELETE_TASK;
    payload: {
        taskId: string;
    };
}

export interface AddBoardAction {
    type: typeof ADD_BOARD;
    payload: Board;
}

export interface EditBoardAction {
    type: typeof EDIT_BOARD;
    payload: Board;
}

export interface DeleteBoardAction {
    type: typeof DELETE_BOARD;
    payload: {
        boardId: string;
    };
}

export interface AddColumnAction {
    type: typeof ADD_COLUMN;
    payload: Column;
}


export interface EditColumnAction {
    type: typeof EDIT_COLUMN;
    payload: Column;
}

export interface DeleteColumnAction {
    type: typeof DELETE_COLUMN;
    payload: {
        columnId: string;
    };
}

export type Action =
    | SetActiveBoardIdAction
    | SetSidebarVisibilityAction
    | SetTaskViewAction
    | SetSubtaskStateAction
    | MoveTaskAction
    | AddTaskAction
    | EditTaskAction
    | DeleteTaskAction
    | AddBoardAction
    | EditBoardAction
    | DeleteBoardAction
    | AddColumnAction
    | EditColumnAction
    | DeleteColumnAction;