import axios from "axios";
import { host } from "./config";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  // 發送登錄請求
  try {
    const res = await axios.post(`${host}/api/auth/login`, userCredentials);
    // 成功，則派发成功的action
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
