import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/Typography.css";
import { AppContextProvider } from "./stateManagement/context/AppContext.tsx";
import {ThemeProvider} from "./stateManagement/context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppContextProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</AppContextProvider>
	</React.StrictMode>
);
