import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EmailSent from "./pages/auth/EmailSent";
import Search from "./pages/Search";
import NewThread from "./pages/NewThread";
import UserProfile from "./pages/UserProfile";
import HomePage from "./pages/user/HomePage";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-200 text-gray-800">
      <div className="w-11/12 mx-auto min-h-screen flex flex-col justify-start items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-sent" element={<EmailSent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/:username" element={<HomePage />}>
            <Route path="/:username/" element={<HomePage />} />
            <Route path="/:username/search" element={<Search />} />
            <Route path="/:username/new-thread" element={<NewThread />} />
            <Route path="/:username/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
