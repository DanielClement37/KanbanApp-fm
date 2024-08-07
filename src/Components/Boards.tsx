/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { AppContext } from "../stateManagement/context/AppContext";
import BoardColumn from "./BoardColumn";
import "../styles/Board.css"

const Boards = () => {
	const { state } = useContext(AppContext);
	const { boards, activeBoardIndex } = state;
	const activeBoard = activeBoardIndex !== null ? boards[activeBoardIndex] : null;

	return (
		<div className="board-container">
      {activeBoard && activeBoard.columns.map((column, index) => (
        <BoardColumn key={index} column={column} />
      ))}
      <div className="add-column-btn">
        <h2 className="heading-XL">
          + New Column
        </h2>
      </div>
		</div>
	);
};

export default Boards;
