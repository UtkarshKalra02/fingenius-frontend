import { useAuth } from "react-oidc-context";
import type { User, UserManager } from "oidc-client-ts";

type ExtendedAuth = ReturnType<typeof useAuth> & {
  userManager: UserManager;
  signinRedirectCallback: () => Promise<User | null>;
};

export function useTypedAuth(): ExtendedAuth {
  return useAuth() as ExtendedAuth;
}