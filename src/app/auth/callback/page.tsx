'use client';

import { useEffect } from "react";
import { UserManager } from "oidc-client-ts";
import { useRouter } from "next/navigation";
import { oidConfig } from "@/utils/oidconfig";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const manager = new UserManager(oidConfig);

    manager.signinRedirectCallback()
      .then((user) => {
        if (user?.id_token) {
          localStorage.setItem("id_token", user.id_token); // ✅ store token for summary
        }
        if (user?.profile?.email) {
          localStorage.setItem("email", user.profile.email); // ✅ store username (utkarsh02)
        }

        const redirectPath = (user?.state as string) || "/dashboard";

        // ✅ Give time for context to settle (this prevents Upload loop)
        setTimeout(() => {
          window.history.replaceState({}, document.title, redirectPath);
          router.replace(redirectPath);
        }, 300); // 300ms wait
      })
      .catch((err) => {
        console.error("Signin callback failed:", err);
        router.replace("/");
      });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B1222] text-white">
      <p className="text-lg">Signing you in…</p>
    </div>
  );
}