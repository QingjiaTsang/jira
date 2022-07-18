import qs from "qs";
import * as auth from "auth-provider";
import { config } from "process";
import { useAuth } from "context/auth-context";
interface Config extends RequestInit {
  searchParam?: object;
  token?: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

// 封装一下原来直接用来发各种请求的fetch, 精简一下该方法
export const http = async (
  endpoint: RequestInfo | URL,
  { searchParam, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": searchParam ? "application/json" : "",
    },
    ...customConfig,
  };

  // 在fetch的GET请求里，querystring所传的参数是要带到url里的
  // 而在非GET请求里，所传的参数是直接放在请求体body里的
  // 因此要做一下判断和处理
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(searchParam)}`;
  } else {
    config.body = JSON.stringify(searchParam || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 标准restful规范
      // HTTP401错误代表用户没有访问权限,需要进行【身份认证】
      if (response.status === 401) {
        await auth.logout();
        // 刷新页面
        window.location.reload();
        return Promise.reject({ message: "请重新登录！" });
      }
      const data = await response.json();
      // response.ok为一个布尔值，标示该 Response 成功（HTTP 状态码的范围在 200-299）
      if (response.ok) {
        return data;
      } else {
        // 必须在不ok的时候手动抛错，
        // 因为fetch对待4XX、5XX等表示错误的状态码，不会抛出error,
        // fetch只有在断网或者网络连接中断的时候才会抛出error
        // 因此需要我们自己手动抛出错误
        // 另外，axios和fetch不同，它能在返回状态码不为2XX的时候抛出error
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
