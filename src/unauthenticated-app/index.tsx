import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const switchButton = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div>
      {isRegistered ? (
        <button onClick={switchButton}>切换到注册</button>
      ) : (
        <button onClick={switchButton}>切换到登录</button>
      )}
      {isRegistered ? (
        <div>
          <LoginScreen />
        </div>
      ) : (
        <div>
          <RegisterScreen />
        </div>
      )}
    </div>
  );
};
