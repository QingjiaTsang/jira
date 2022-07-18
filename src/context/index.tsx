import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// AppProviders是用来在整个项目入口index里包裹住根节点<APP/>的
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
