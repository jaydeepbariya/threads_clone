import React from "react";
import { Link } from "react-router-dom"; 
import homeImg from "../../assets/friends_home.jpg";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto bg-blue-500 h-screen flex items-center justify-center gap-x-10 max-lg:flex-col">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Connect and Share with Our Social Media Platform
        </h1>
        <p className="text-lg mb-8">
          Join our community to connect with friends and share your moments.
        </p>

        <div className="space-x-8">
          <Link to="/login">
            <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-100">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-100">
              Register
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 mx-4">
        <img
          src={homeImg}
          alt="Social Media Illustration"
          className="rounded-lg shadow-white shadow-lg max-w-full"
        />
      </div>
    </div>
  );
};

export default Home;
