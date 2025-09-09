import { AuthUIState } from "../context/AuthUIStateContext.tsx";
import { AuthState } from "../types/index.tsx";

export const authInitialState: AuthUIState = {
    status: AuthState.Unauthenticated,
    authError: null,
};
