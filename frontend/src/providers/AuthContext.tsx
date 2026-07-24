import type { GetMeResponse } from "../types/auth";
import { createContext } from "react";

type AuthContextValue = {
    user: GetMeResponse | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
