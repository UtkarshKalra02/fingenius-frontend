"use client";

import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

export default function AuthButtons() {
  const oidc = useAuth();

  const btnClass =
    "px-4 py-2 rounded-full font-medium bg-blue-500 hover:bg-blue-600 text-white";

  // ✅ Store ID token on successful login
  useEffect(() => {
    if (oidc.isAuthenticated && oidc.user?.id_token) {
      localStorage.setItem("id_token", oidc.user.id_token);
    }
  }, [oidc.isAuthenticated, oidc.user]);

  // 🔒 Logout handler
  const handleLogout = async () => {
    await oidc.removeUser(); // Clear localStorage/sessionStorage
    const logoutUrl = `https://ap-south-1drelqz2cd.auth.ap-south-1.amazoncognito.com/logout?client_id=5rckvpl3780cids2uafeljdl73&logout_uri=http://localhost:3000`;
    window.location.href = logoutUrl;
  };

  // 🧠 While loading
  if (oidc.isLoading) return <div>Loading...</div>;

  // 🔓 If not logged in
  if (!oidc.isAuthenticated) {
    return (
      <button className={btnClass} onClick={() => oidc.signinRedirect()}>
        Login
      </button>
    );
  }

  // ✅ If logged in
  return (
    <button className={btnClass} onClick={handleLogout}>
      Logout
    </button>
  );
}
