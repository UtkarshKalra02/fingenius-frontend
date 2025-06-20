"use client";

import { useAuth } from "react-oidc-context";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const pathname = usePathname();

  const isCallbackPage = pathname === "/auth/callback";
  const redirectingRef = useRef(false); // ✅ prevent duplicate redirects

  useEffect(() => {
    if (
      auth &&
      !redirectingRef.current &&
      !isCallbackPage &&
      !auth.isLoading &&
      !auth.isAuthenticated
    ) {
      redirectingRef.current = true;
      auth.signinRedirect({ state: pathname });
    }
  }, [auth, auth?.isLoading, auth?.isAuthenticated, pathname, isCallbackPage]);

  if (!auth) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading authentication...
      </div>
    );
  }

  if (auth.isLoading || !auth.isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading secure content...
      </div>
    );
  }

  return <>{children}</>;
}