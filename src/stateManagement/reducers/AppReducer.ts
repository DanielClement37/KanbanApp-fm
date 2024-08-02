import { Board } from "../../types/kanbanTypes";
import GivenState from "../../json/data.json";

export interface AppState {
	isDarkMode: boolean;
	isSidebarVisible: boolean;
	boards: Board[];
	activeBoardIndex: number | null;
}

export const initialState: AppState = {
	isDarkMode: false,
	isSidebarVisible:true,
	boards: GivenState.boards,
	activeBoardIndex: 0,
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appReducer = (state: AppState, action: any) => {
	switch (action.type) {
		default:
			return state;
	}
};
