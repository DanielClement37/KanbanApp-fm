// uiReducer.ts
import {Action, SET_ACTIVE_BOARD_ID, SET_SIDEBAR_VISIBILITY, SET_TASK_VIEW} from "../actions/actiontypes";

export interface UIState {
    isDarkMode: boolean;
    activeBoardId: string | null;
    activeTaskId: string | null;
    isSidebarVisible: boolean;
}

export const initialUIState: UIState = {
    isDarkMode: false,
    activeBoardId: "board-1", //TODO: Cache the last active board in local storage and load it here
    activeTaskId: null,
    isSidebarVisible: true,
};

export const uiReducer = (state: UIState = initialUIState, action: Action): UIState => {
    switch (action.type) {
        case SET_ACTIVE_BOARD_ID: {
            return {
                ...state,
                activeBoardId: action.payload,
            };
        }
        case SET_SIDEBAR_VISIBILITY:
            return {
                ...state,
                isSidebarVisible: action.payload,
            };
        case SET_TASK_VIEW: {
            return {
                ...state,
                activeTaskId: action.payload,
            };
        }
        // Add case for isDarkMode here
        default:
            return state;
    }
};
