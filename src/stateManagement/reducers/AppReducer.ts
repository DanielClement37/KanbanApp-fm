import GivenState from "../../json/data.json";
import {arrayToObjectById} from "../../Helpers/arrayToObjectById.ts";
import {boardsReducer, BoardsState} from "./boardsReducer";
import {columnsReducer, ColumnsState} from "./columnsReducer";
import {tasksReducer, TasksState} from "./tasksReducer";
import {subtasksReducer, SubtasksState} from "./subtasksReducer";
import {initialUIState, uiReducer, UIState} from "./uiReducer";
import {combineReducers} from "./combineReducers.ts";

export interface AppState {
    ui: UIState;
    boards: BoardsState;
    columns: ColumnsState;
    tasks: TasksState;
    subtasks: SubtasksState;
}


export const initialState: AppState = {
    ui: initialUIState,
    boards: arrayToObjectById(GivenState.boards),
    columns: arrayToObjectById(GivenState.columns),
    tasks: arrayToObjectById(GivenState.tasks),
    subtasks: arrayToObjectById(GivenState.subtasks),
};


export const appReducer = combineReducers<AppState>({
    ui: uiReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
    subtasks: subtasksReducer,
});