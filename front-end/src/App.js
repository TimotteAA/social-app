import Home from "./pages/home/Home";
// import { Person } from "@mui/icons-material";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/resiger/Register";
import Messenger from "./pages/messenger/Messenger";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* 如果登錄了，則去往用戶主頁，否則前往注冊頁面 */}
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          exact
          path="/login"
          // 如果已經登錄，則導航到首頁，否則跳轉到登錄頁面
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route
          exact
          path="/register"
          // 如果已經登錄，則導航到首頁，否則跳轉到注冊頁面
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          exact
          path="/messenger"
          // 如果已經登錄，則導航到首頁，否則跳轉到注冊頁面
          element={user ? <Messenger /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
