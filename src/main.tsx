import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/Typography.css";
import { AppContextProvider } from "./stateManagement/context/AppContext.tsx";
import {ThemeProvider} from "./stateManagement/context/ThemeContext.tsx";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppContextProvider>
			<ThemeProvider>
				<DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
			</ThemeProvider>
		</AppContextProvider>
	</React.StrictMode>
);
