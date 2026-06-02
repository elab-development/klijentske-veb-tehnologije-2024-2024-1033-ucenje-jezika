import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        // if we use context in something that is not wrapped in
        // in our case it will be because we wrap App with it
        throw Error('useAuthContext must be inside an AuthContextProvider');
    }

    return context;
}