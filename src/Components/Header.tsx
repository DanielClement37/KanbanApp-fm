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

const Header = () => {
	const isBiggerScreen = useMediaQuery({ minWidth: 768 }); //For Tablet and up
	const { state, dispatch } = useContext(AppContext);
	const { boards, activeBoardIndex } = state;

	//States
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	return (
		<div className="header-container">
			<header>
				<div className="logo-container">
					<img className="logo" src={!isBiggerScreen ? LogoMobile : LogoDark} alt="logo" />
				</div>
				<div className="board-name-container heading-L">
					<h3>{activeBoardIndex !== null ? boards[activeBoardIndex].name : ''}</h3>
					{!isBiggerScreen && <img src={isDropDownOpen ? ChevronUp : ChevronDown} alt="dropdown opened/closed" onClick={() => setIsDropDownOpen(!isDropDownOpen)} />}
				</div>
				<button className="btn add-task-btn">{isBiggerScreen ? "+ Add New Task" : <img src={AddTaskIcon} alt="add task" />}</button> {/*TODO disable button when there board is empty*/}
				<img className="ellipsis-btn" src={Ellipsis} alt="edit or delete board" />
			</header>
		</div>
	);
};

export default Header;
