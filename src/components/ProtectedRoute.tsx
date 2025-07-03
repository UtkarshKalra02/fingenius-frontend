"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("id_token");

    if (!token && pathname !== "/auth/callback") {
      
      const loginUrl = `https://ap-south-1drelqz2cd.auth.ap-south-1.amazoncognito.com/login?client_id=5rckvpl3780cids2uafeljdl73&response_type=code&scope=openid+email+phone&redirect_uri=${encodeURIComponent(window.location.origin + "/auth/callback")}`;
      window.location.href = loginUrl + `&state=${pathname}`;
    } else {
      setChecked(true); // ✅ Safe to show the page
    }
  }, [pathname]);

  if (!checked) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Verifying login...
      </div>
    );
  }

  return <>{children}</>;
}