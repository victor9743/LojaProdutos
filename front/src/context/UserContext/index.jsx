import { createContext, useState } from "react";
export const GlobalContext = createContext();

export const UserContext = ({children}) => {
    const [contextState] = useState({msg: "123"});

    return (
        <GlobalContext.Provider value={contextState}>
            {children}
        </GlobalContext.Provider>
    )
}