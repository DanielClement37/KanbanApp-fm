// subtasksReducer.ts
import { Subtask } from "../../types/kanbanTypes";
import { Action, SET_SUBTASK_STATE } from "../actions/actiontypes";

export interface SubtasksState {
    [id: string]: Subtask;
}

export const subtasksReducer = (state: SubtasksState = {}, action: Action): SubtasksState => {
    switch (action.type) {
        case SET_SUBTASK_STATE: {
            const { subtaskId, isCompleted } = action.payload;
            const subtask = state[subtaskId];
            if (!subtask) {
                return state;
            }
            return {
                ...state,
                [subtaskId]: {
                    ...subtask,
                    isCompleted,
                },
            };
        }
        default:
            return state;
    }
};
