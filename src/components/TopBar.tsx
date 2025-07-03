"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    if (auth?.user?.profile) {
      const profile = auth.user.profile;
      const uname =
        (typeof profile.preferred_username === "string" && profile.preferred_username) ||
        (typeof profile["cognito:username"] === "string" && profile["cognito:username"]) ||
        (typeof profile.email === "string" && profile.email) ||
        "User";

      setUsername(uname);
    }
  }, [auth?.user]);

  const handleLogout = async () => {
    await auth.removeUser();
    localStorage.removeItem("id_token");
    localStorage.removeItem("email");

    const logoutUrl = `https://ap-south-1drelqz2cd.auth.ap-south-1.amazoncognito.com/logout?client_id=5rckvpl3780cids2uafeljdl73&logout_uri=${encodeURIComponent(window.location.origin)}`;
    window.location.href = logoutUrl;
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-sm border-b bg-white">
      <div className="text-sm text-gray-600">
        Welcome, <strong>{username}</strong>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            title="Logout"
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure you want to log out?
          </p>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Confirm Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}