import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import homeImg from "../assets/friends_home.jpg";
import HomePage from "./user/HomePage";

const Home = () => {
  const { username } = useParams();

  return (
    <div className="w-11/12 min-h-screen flex justify-center items-center gap-6">
      {username ? (
        <HomePage />
      ) : (
        <div className="w-full flex justify-center items-center gap-6">
          <div className="w-1/2">
            <img src={homeImg} alt="home" className="p-4" />
          </div>
          <div className="w-1/2">
            <div className="w-full mt-10">
              <h1 className="text-center text-3xl font-bold mb-6">
                Welcome to ThreadsClone App
              </h1>
              <div className="flex justify-center">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
