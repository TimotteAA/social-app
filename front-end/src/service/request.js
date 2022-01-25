import axios from "axios";
import { host } from "../config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const request = axios.create({
  baseURL: host,
});

request.defaults.withCredentials = true;

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return err;
  }
);

request.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(111);
    if (!refreshToken) {
      const { dispatch } = useContext(AuthContext);
      const navigate = useNavigate();
      dispatch({ type: "LOG_OUT" });
      // 退出后，回到首页
      navigate("/");
      return err;
    } else {
      const res = await request.post("/api/auth/verifyRefresh", {
        token: refreshToken,
      });
      // console.log(res.data.isExpired);
      if (res.data.isExpired) {
        const { dispatch } = useContext(AuthContext);
        const navigate = useNavigate();
        dispatch({ type: "LOG_OUT" });
        // 退出后，回到首页
        navigate("/");
        return err;
      }

      const res2 = await axios.post(`${host}/api/auth/refresh`, {
        token: refreshToken,
        id: user.user.id,
        username: user.user.username,
      });
      console.log(res2.data);
      // localStorage.removeItem("refreshToken");
      localStorage.claer();
      localStorage.setItem("currentUser", JSON.stringify(res2.data));
      localStorage.setItem("refreshToken", res2.data.refreshToken);
      // localStorage.setItem("refreshToken", res2.data.refreshToken);
      return axios.request(err.config);
    }
  }
);

export default request;
