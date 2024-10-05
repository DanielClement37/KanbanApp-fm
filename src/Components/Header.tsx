import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import LogoMobile from "../assets/logo-mobile.svg";
// import LogoLight from "../assets/logo-light.svg";
import LogoDark from "../assets/logo-dark.svg";
import ChevronDown from "../assets/icon-chevron-down.svg";
import ChevronUp from "../assets/icon-chevron-up.svg";
import AddTaskIcon from "../assets/icon-add-task-mobile.svg";
import Ellipsis from "../assets/icon-vertical-ellipsis.svg";
import "../styles/Header.css";
import { AppContext } from "../stateManagement/context/AppContext";
import EllipseMenu from "./Modals/EllipseMenu";
import AddEditTask from "./Modals/AddEditTask";
import AddEditBoard from "./Modals/AddEditBoard";

const Header = () => {
	const isBiggerScreen = useMediaQuery({ minWidth: 768 }); // For Tablet and up
	const { state } = useContext(AppContext);
	const { boards } = state;
	const { activeBoardId } = state.ui;
	const board = activeBoardId ? boards[activeBoardId] : null;

	// Modals
	const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
	const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);

	return (
		<div className="header-container">
			<header>
				<div className="logo-container">
					<img className="logo" src={!isBiggerScreen ? LogoMobile : LogoDark} alt="logo" />
				</div>
				<div onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="board-name-container heading-L">
					<h3>{board ? board.name : "No Board Selected"}</h3>
					{!isBiggerScreen && (
						<img src={isDropDownOpen ? ChevronUp : ChevronDown} alt="dropdown opened/closed" />
					)}
				</div>
				<button
					onClick={() => setIsAddTaskModalOpen(!isAddTaskModalOpen)}
					className="btn add-task-btn"
					disabled={!board} // Disable if no board is selected
				>
					{isBiggerScreen ? "+ Add New Task" : <img src={AddTaskIcon} alt="add task" />}
				</button>
				<div
					className="elipsis-container"
					onClick={() => {
						setIsElipsisMenuOpen(!isElipsisMenuOpen);
					}}
				>
					<img className="elipsis-btn" src={Ellipsis} alt="edit or delete board" />
				</div>
				{isElipsisMenuOpen && (
					<EllipseMenu
						type="board"
						item={board!}
						id={activeBoardId!}
						onEdit={() => {
							setIsEditBoardModalOpen(true);
							setIsElipsisMenuOpen(false);
						}}
					/>
				)}
				{isAddTaskModalOpen && (
					<AddEditTask closeTaskModal={() => setIsAddTaskModalOpen(!isAddTaskModalOpen)} isEditMode={false} />
				)}
				{isEditBoardModalOpen && (
					<AddEditBoard closeModal={() => setIsEditBoardModalOpen(false)} isEditMode={true} board={board!} />
				)}
			</header>
		</div>
	);
};

export default Header;
