import { useState } from "react";
import { Card, Button } from "antd";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const switchButton = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegistered ? (
          <Button type="dashed" onClick={switchButton}>
            切换到注册
          </Button>
        ) : (
          <Button type="dashed" onClick={switchButton}>
            切换到登录
          </Button>
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
      </Card>
    </div>
  );
};
