import axios from "axios";
import { useLogin } from "@/stores/login";
import { showNotify } from "vant";
const Axios = axios.create({
  baseURL: "/api",
  timeout: 5000
});

// http request 拦截器
Axios.interceptors.request.use(
  (config) => {
    // 发送请求前的处理

    // // 这里可以处理 token
    // 这里可以处理 token
    const stores = useLogin();
    if (stores.token) {
      config.headers.Authorization = stores.token;
    }

    return config;
  },
  (err) => {
    // 请求错误的处理
    return Promise.reject(err);
  }
);

// http response 拦截器
Axios.interceptors.response.use(
  //处理响应数据
  (response) => {
    return response.data;
  },
  // 抛出错误
  (error) => {
    if (error.response.status === 403) {
      showNotify({
        message: "User is not logged in or the authentication has expired. Please log in again",
        color: "#ad0000",
        background: "#ffe1e1"
      });
      const router = useRouter();
      const stores = useLogin();
      stores.logout();
      router.push("/");
    }
    return Promise.reject(error.response);
  }
);

export default Axios;
