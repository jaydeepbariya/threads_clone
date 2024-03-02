import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { registerData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const register = () => {
    console.log("registerData ", registerData);
    registerUser(otp, registerData, navigate);
  };

  return (
    <div className='className="w-1/5 min-h-screen mx-auto flex flex-col justify-center items-center p-8'>
      <h1 className="text-3xl font-bold mb-8">Verify Email</h1>
      <p className="text-md my-3">
        We have sent an one time password to your email address. please input
        that here.
      </p>

      <div className="w-full flex flex-col justify-center items-center my-4">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{ padding: "10px" }}
        />

        <button
          onClick={register}
          className="px-3 py-1 rounded-md bg-blue-600 text-white transition-all duration-200 hover:bg-blue-400"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
