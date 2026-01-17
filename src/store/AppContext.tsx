import { createContext } from "react";


export type AppCtx = {
    userID: string;
    handleUserIDChange: (userID: string) => void;
};


const AppContext = createContext<AppCtx>({
    userID: "",
    handleUserIDChange: () => {},
});

export default AppContext;