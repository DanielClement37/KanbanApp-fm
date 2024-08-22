/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useReducer, useState } from "react";
import { useMediaQuery } from "react-responsive";
import LogoMobile from "../assets/logo-mobile.svg";
//import LogoLight from "../assets/logo-light.svg";
import LogoDark from "../assets/logo-dark.svg";
import ChevronDown from "../assets/icon-chevron-down.svg";
import ChevronUp from "../assets/icon-chevron-up.svg";
import AddTaskIcon from "../assets/icon-add-task-mobile.svg";
import Ellipsis from "../assets/icon-vertical-ellipsis.svg";
import "../styles/Header.css";
import { AppContext } from "../stateManagement/context/AppContext";
import ElipseMenu from "./Modals/ElipseMenu";

const Header = () => {
	const isBiggerScreen = useMediaQuery({ minWidth: 768 }); //For Tablet and up
	const { state, dispatch } = useContext(AppContext);
	const { boards, activeBoardIndex } = state;
	const board = activeBoardIndex !== null ? boards[activeBoardIndex] : null;

	//modals
	const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	return (
		<div className="header-container">
			<header>
				<div className="logo-container">
					<img className="logo" src={!isBiggerScreen ? LogoMobile : LogoDark} alt="logo" />
				</div>
				<div onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="board-name-container heading-L">
					<h3>{boards[activeBoardIndex!].name}</h3>
					{!isBiggerScreen && <img src={isDropDownOpen ? ChevronUp : ChevronDown} alt="dropdown opened/closed" />}
				</div>
				<button className="btn add-task-btn">{isBiggerScreen ? "+ Add New Task" : <img src={AddTaskIcon} alt="add task" />}</button>{" "}
				{/*TODO disable button when there board is empty*/}
				<div
					className="elipsis-container"
					onClick={() => {
						setIsElipsisMenuOpen(!isElipsisMenuOpen);
					}}
				>
					<img className="elipsis-btn" src={Ellipsis} alt="edit or delete board" />
				</div>
				{isElipsisMenuOpen && <ElipseMenu type="board" item={board!} index={activeBoardIndex!} />}
			</header>
		</div>
	);
};

export default Header;
