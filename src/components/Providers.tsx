'use client';

import { ReactNode } from "react";
import { AuthProvider } from "react-oidc-context";
import { oidConfig } from "@/utils/oidconfig";

export default function Providers({children}:{children:ReactNode}){
    return <AuthProvider {...oidConfig}>{children}</AuthProvider>
}