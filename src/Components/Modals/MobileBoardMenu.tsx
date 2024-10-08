import React, {useContext, useState} from 'react';
import {AppContext} from "../../stateManagement/context/AppContext.tsx";
import {SET_ACTIVE_BOARD_ID} from "../../stateManagement/actions/actiontypes.ts";
import IconLightTheme from "../../assets/icon-light-theme.svg";
import IconDarkTheme from "../../assets/icon-dark-theme.svg";
import {SidebarItem} from "../FormComponents/SidebarItems.tsx";
import AddEditBoard from "./AddEditBoard.tsx";

interface MobileBoardMenuProps {
    closeModal: () => void;
}

const MobileBoardMenu = ({closeModal}: MobileBoardMenuProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {boards} = state;

    const [showBoardModal, setShowBoardModal] = useState(false);
    const boardIds = Object.keys(boards);

    const handleSidebarItemClick = (boardId: string) => {
        dispatch({type: SET_ACTIVE_BOARD_ID, payload: boardId});
    };

    return (
        <>
            <div className="dropdown-modal-overlay" onClick={closeModal}>
                <div className="board-menu-card" onClick={(e) => e.stopPropagation()}>
                    <p className="board-count grey-text text-M">ALL BOARDS ({boardIds.length})</p>
                    <div className="sidebar-item-container">
                        {boardIds.map((boardId) => (
                            <SidebarItem
                                key={boardId}
                                icon={
                                    <svg className="icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
                                    </svg>
                                }
                                label={boards[boardId].name}
                                isSelected={boardId === state.ui.activeBoardId}
                                onClick={() => handleSidebarItemClick(boardId)}
                            />
                        ))}
                        <SidebarItem
                            icon={
                                <svg className="icon icon-add" width="16" height="16"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
                                </svg>
                            }
                            label="+ Create New Board"
                            isPurple={true}
                            onClick={() => setShowBoardModal(true)}
                        />
                    </div>
                    <div className="theme-selector-container">
                        <div className="theme-switch">
                            <img className="theme-icon" src={IconLightTheme} alt="Light Theme"/>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <img className="theme-icon" src={IconDarkTheme} alt="Dark Theme"/>
                        </div>
                    </div>
                </div>
            </div>
            {showBoardModal && <AddEditBoard closeModal={() => setShowBoardModal(false)} isEditMode={false}/>}
        </>
    );
};

export default MobileBoardMenu;