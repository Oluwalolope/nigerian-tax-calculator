import { useState } from "react";
import type { AppCtx } from "./AppContext";
import AppContext from "./AppContext";


const userIDFromLocalStorage = localStorage.getItem('userID');

let storedUserID: string = '';

if (userIDFromLocalStorage) {
  storedUserID = JSON.parse(userIDFromLocalStorage);
}

const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userID, setUserID] = useState<string>(storedUserID);


    const handleUserIDChange = (newUserID: string) => {
        setUserID(newUserID);
        localStorage.setItem('userID', JSON.stringify(newUserID));
    };

        
    const appContextValue: AppCtx = {
        userID,
        handleUserIDChange
    }

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;