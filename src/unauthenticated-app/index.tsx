import { useState } from "react";
import { Card, Button, Divider } from "antd";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        {isRegistered ? (
          <div>
            <Title>请登录</Title>
            <LoginScreen />
          </div>
        ) : (
          <div>
            <Title>请注册</Title>
            <RegisterScreen />
          </div>
        )}
        <Divider />
        <a onClick={() => setIsRegistered(!isRegistered)}>
          {isRegistered ? "还没有账号？请注册！" : "已经注册？请登录！"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const ShadowCard = styled(Card)`
  width: 40rem;
  /* min-height: 56rem;  */
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Title = styled.h1`
  color: gray;
`;
export const LongButton = styled(Button)`
  width: 100%;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
