import React, { useEffect } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化User，使得每次刷新页面也能够获取到登录态而非重置掉user值为初值null
const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken() || undefined;
  if (token) {
    // 通过获取到的token向后端查找其映射的user数据并返回
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 在【全局】创建context出来，并传入默认值undefined。
// 这儿要做一下context值的类型限定，context的value值和默认值都是同一个类型，不限制会默认类型为默认值的类型undefined
// 因此这里要做的类型限制是，先声明value的模样以及或上一个undefined
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
// displayName仅仅为了浏览器react调试工具devTool显示context名称用(否则是匿名context)
AuthContext.displayName = "AuthContext";

// 使用Context.Provider，在里面value传入要往下传递的数据，并返回Context.Provider标签出去(用于后续包裹孩子节点)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    boostrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 使用React.useContext来拿到上面Context.Provider里value传下来的值并返回出去
// 其他地方只需要引用并使用本文件里的userAuth这个接口即可使用想要透传的value值来使用里面的东西
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
