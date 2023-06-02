import axios from "axios";
import { message } from "ant-design-vue";

const service = axios.create({
  baseURL: "", // url = base url + request url
  timeout: 60000 * 5,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== "0") {
      message.error(res.msg || "接口返回Error");
      return Promise.reject(res);
    } else {
      if (res?.data?.token) {
        sessionStorage.setItem("token", res.data.token);
      }
      return res;
    }
  },
  (error) => {
    console.error(error);
    if (error.response) {
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
        location.reload();
      }
      message.error(error.message || error.response.data || "接口返回Error");
      return Promise.reject(error.response.data);
    }
  }
);

export default service;
