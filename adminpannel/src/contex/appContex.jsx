import { createContext } from "react";

export const AppContex = createContext();

export const AppContexProvider = (props) => {
    const value = 0;
    return (
        <AppContex.Provider value={value}>
            {props.children}
        </AppContex.Provider>
    )
}