/** 
import { RunningState } from "../../Types/Enums";
import { Cell, GameState } from "../../Types/GameTypes";

export const SET_MATCH_STATE = "SET_MATCH_STATE";
export const PAUSE = "PAUSE"
export const RESUME = "RESUME"
export const MAKE_MOVE = "MAKE_MOVE";
export const GET_MOVES = "GET_MOVES";
export const SET_HOVERED_COLUMN = "SET_HOVERED_COLUMN"
export const GAME_OVER = "GAME_OVER"
export const SET_WINNING_CELLS = "SET_WINNING_CELLS"

export interface Action {
	type: "SET_MATCH_STATE" | "MAKE_MOVE" | "PAUSE"| "RESUME" | "GET_MOVES" | "SET_HOVERED_COLUMN" | "GAME_OVER" | "SET_WINNING_CELLS";
	payload: GameState | RunningState | Cell[]  |{ row: number, col: number }[]
}
**/