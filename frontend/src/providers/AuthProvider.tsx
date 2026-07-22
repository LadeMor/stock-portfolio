import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { getMe } from "../lib/api/auth";
import { AuthContext } from "./AuthContext";
import type { GetMeResponse } from "../types/auth";
import type { ApiError } from "../lib/apiClient";

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {

    const token = localStorage.getItem('userToken')

    const { isPending, isError, data, error } = useQuery<GetMeResponse, ApiError>({
        queryKey: ['current-user'],
        queryFn: () => getMe(token!),
        enabled: Boolean(token),
        retry: false,
    })

    const isAuthLoading = Boolean(token) && isPending

    if (isAuthLoading) {
        return <span>Loading...</span>
    }

    if (isError && error.status !== 401) {
        return <span>Error: {error.message}</span>
    }

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                token: token,
                isAuthenticated: Boolean(data) && !isError,
                isLoading: isAuthLoading,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;