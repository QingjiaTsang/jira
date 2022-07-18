import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

// const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>注册成功!</div> : <div>请注册！</div>}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <div>
        <input type="submit" value="注册" />
      </div>
    </form>
  );
};
