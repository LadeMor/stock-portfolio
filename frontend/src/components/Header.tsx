import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../providers/useAuth";

export function Header() {
    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {
        logout()
        navigate({
            to: '/login',
            replace: true,
        })
    }

    return (
        <header className="bg-surface px-4 py-3 border-b-1 border-gray-200 mb-3 flex justify-between align-center">
            <h2 className="text-lg">Stock portfolio</h2>
            <img onClick={handleLogout} src="./icons/logout.svg" alt="Logout" className="cursor-pointer p-2 rounded-sm hover:bg-gray-300" />
        </header>
    );
}