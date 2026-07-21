import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { getMe } from "../lib/api/auth";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {

    const token = localStorage.getItem('userToken')

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['current-user'],
        queryFn: () => getMe(token!),
        enabled: Boolean(token),
    })

    const isAuthLoading = Boolean(token) && isPending

    if (isAuthLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isAuthenticated: Boolean(data),
                isLoading: isAuthLoading,
                
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;