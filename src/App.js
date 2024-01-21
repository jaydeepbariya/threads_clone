import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserHome from "./components/user/UserHome";


function App() {
  return (
    <div className="dark:bg-gray-800 w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-200 text-gray-800">    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:username" element={<UserHome />} />
      </Routes>

    </div>
  );
}

export default App;
