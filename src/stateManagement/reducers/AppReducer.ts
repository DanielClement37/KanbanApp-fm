import { Board } from "../../types/kanbanTypes";

export interface AppState {
	isDarkMode: boolean;
	isSidebarVisible: boolean;
	boards: Board[];
}

export const initialState: AppState = {
	isDarkMode: false,
	isSidebarVisible:true,
	boards: []
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appReducer = (state: AppState, action: any) => {
	switch (action.type) {
		default:
			return state;
	}
};
