import { Outlet } from "@tanstack/react-router"
import { Header } from "./Header";

export function AuthenticatedLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}