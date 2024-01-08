import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="dark:bg-gray-800 w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-200 text-gray-800">
        
        <div className="mx-auto max-w-[600px]">
          <Header />
        </div>

        <Routes className="mx-auto max-w-[600px]">
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:id" element={<PostPage />} />
        </Routes>
    </div>
  );
}

export default App;
