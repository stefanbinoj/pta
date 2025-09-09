import { createContext, useContext } from "react";
import { AuthState } from "../types/index.tsx";

export interface AuthUIState {
    status: AuthState;
    authError: string | null;
}

export const AuthUIStateContext = createContext<AuthUIState | null>(null);

export const useUIState = () => {
    const context = useContext(AuthUIStateContext);
    if (!context) {
        throw new Error("useUIState must be used within a UIStateProvider");
    }
    return context;
};
