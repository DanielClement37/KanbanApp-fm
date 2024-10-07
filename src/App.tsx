/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from "react";
import Boards from "./Components/Boards";
import Header from "./Components/Header";
import {AppContext} from "./stateManagement/context/AppContext";
import "./styles/App.css";
import EmptyBoard from "./Components/EmptyBoard";
import Sidebar from "./Components/Sidebar";
import {useMediaQuery} from "react-responsive";

function App() {
    const isBiggerScreen = useMediaQuery({minWidth: 768}); //For Tablet and up
    const {state} = useContext(AppContext);
    const {boards} = state;

    return (
        <div className="app-container">
            <Header/>
            <div className="content-container">
                {isBiggerScreen && <Sidebar/>}
                {(Object.keys(boards).length === 0 || state.ui.activeBoardId === null) ? <EmptyBoard/> : <Boards/>}
            </div>
        </div>
    );
}

export default App;
