import { Task } from "../../types/kanbanTypes";
import { Action, ADD_TASK, EDIT_TASK, DELETE_TASK, MOVE_TASK } from "../actions/actiontypes";

export interface TasksState {
    [id: string]: Task;
}

export const tasksReducer = (state: TasksState = {}, action: Action): TasksState => {
    switch (action.type) {
        case ADD_TASK: {
            const newTask = action.payload;
            return {
                ...state,
                [newTask.id]: newTask,
            };
        }
        case EDIT_TASK: {
            const updatedTask = action.payload;
            return {
                ...state,
                [updatedTask.id]: updatedTask,
            };
        }
        case DELETE_TASK: {
            const { taskId } = action.payload;
            const { [taskId]: deletedTask, ...remainingTasks } = state;
            return remainingTasks;
        }
        case MOVE_TASK: {
            const { taskId, toColumnId } = action.payload;
            const task = state[taskId];
            if (!task) {
                return state;
            }
            const updatedTask = { ...task, columnId: toColumnId };
            return {
                ...state,
                [taskId]: updatedTask,
            };
        }
        default:
            return state;
    }
};