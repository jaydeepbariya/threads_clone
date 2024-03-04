import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { useSelector } from "react-redux";
import Home from "../Home";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Home />;
  } else
    return (
      <div className="w-11/12 mx-auto min-h-screen flex flex-col justify-start items-start py-6 px-3">
        <Navbar />
      </div>
    );
};

export default HomePage;
