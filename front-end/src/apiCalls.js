import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  // 發送登錄請求
  try {
    const res = await axios.post(`${host}/api/auth/login`, userCredentials);
    // 成功，則派发成功的action
    // console.log(res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    // window.location.replace("/");
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
