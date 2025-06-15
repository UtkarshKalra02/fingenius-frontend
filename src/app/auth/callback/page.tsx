"use client";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth && typeof auth.signinRedirectCallback === "function") {
      auth
        .signinRedirectCallback()
        .then((user) => {
          const returnPath = typeof user?.state === "string" ? user.state : "/dashboard";
          window.history.replaceState({}, document.title, "/");
          router.replace(returnPath);
        })
        .catch((err) => {
          console.error("Callback error:", err);
          router.replace("/");
        });
    } else {
      console.warn("signinRedirectCallback not available on auth");
      router.replace("/");
    }
  }, [auth, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B1222] text-white">
      <p className="text-lg">Signing you in…</p>
    </div>
  );
}