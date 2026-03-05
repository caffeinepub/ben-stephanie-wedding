import { useState } from "react";
import { AdminLogin } from "../components/admin/AdminLogin";
import { AdminPanel } from "../components/admin/AdminPanel";

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("admin_passcode_auth") === "true",
  );

  function handleLogout() {
    localStorage.removeItem("admin_passcode_auth");
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
}
