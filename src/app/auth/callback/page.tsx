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
          localStorage.setItem("id_token", user.id_token);
        }
        if (user?.profile?.["cognito:username"]) {
          localStorage.setItem("username", user.profile["cognito:username"]);
        }

        const redirectPath = (user?.state as string) || "/dashboard";

        setTimeout(() => {
          window.history.replaceState({}, document.title, redirectPath);
          router.replace(redirectPath);
        }, 300);
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