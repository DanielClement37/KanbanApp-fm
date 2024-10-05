import React, { createContext, useReducer, ReactNode } from 'react';
import {appReducer, AppState, initialState} from '../reducers/AppReducer';


interface IChildren {
    children: ReactNode;
  }

interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextType>({
    state: initialState,
    dispatch: () => null,
});

export const AppContextProvider = ({ children }: IChildren) => {
    const [state, dispatch] = useReducer( appReducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};