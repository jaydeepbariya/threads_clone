import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { apis } from "../data/apis";
import { login, register } from "../state/reducers/authSlice";

export const sendotp = async (email, registerData, navigate, dispatch) => {
  const toastId = toast.loading("Sending OTP");
  try {
    const response = await apiConnector("POST", apis.SEND_OTP, {
      email,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
      return;
    }

    console.log("SEND OTP RESPONSE ", response.data);

    dispatch(register(registerData));

    toast.success("OTP Sent Successfully !");
    navigate("/verify-email");
    toast.dismiss(toastId);
  } catch (error) {
    console.log("SEND OTP ERROR..", error);
    toast.dismiss(toastId);
    toast.error("Error sending otp. Please try again");
    navigate("/register");
    return;
  }
};

export const registerUser = async (otp, registerData, navigate) => {
  const toastId = toast.loading("Registration in process");
  try {
    console.log("otp ", otp);
    console.log("registerData ", registerData);

    const response = await apiConnector("POST", apis.REGISTER, {
      ...registerData,
      otp,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
      return;
    }

    console.log("REGISTER RESPONSE ", response.data);

    toast.success("Registered Successfully. Please Login. ");
    navigate("/login");
    toast.dismiss(toastId);
  } catch (error) {
    console.log("REGISTER ERROR..", error);
    toast.dismiss(toastId);
    toast.error("Error in registration. Please try again");
    navigate("/register");
    return;
  }
};

export const loginUser = async (loginData, navigate, dispatch) => {
  const toastId = toast.loading("Login in process");
  try {
    const response = await apiConnector("POST", apis.LOGIN, loginData);

    if (!response.data.success) {
      throw new Error(response.data.message);
      return;
    }

    console.log("LOGIN RESPONSE ", response.data);

    dispatch(login(response.data));

    toast.success("Logged in successfully !");
    navigate("/" + response.data.user.username);
    toast.dismiss(toastId);
    return;
  } catch (error) {
    console.log("LOGIN ERROR..", error);
    toast.dismiss(toastId);
    toast.error("Error in logging in. Please try again");
    navigate("/login");
    return;
  }
};

export const forgotPassword = async (email, navigate) => {
  const toastId = toast.loading("Sending reset password email");
  try {
    const response = await apiConnector("POST", apis.FORGOT_PASSWORD, {
      email,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
      return;
    }

    console.log("FORGOT PASSWORD RESPONSE ", response.data);

    toast.success("Reset password email sent successfully !");
    navigate("/email-sent");
    toast.dismiss(toastId);
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR..", error);
    toast.dismiss(toastId);
    toast.error("Error in sending reset password email. Please try again");
    navigate("/forgot-password");
    return;
  }
};

export const resetPassword = async (token, password, navigate) => {
  const toastId = toast.loading("Changing password");
  try {
    const response = await apiConnector("POST", apis.RESET_PASSWORD, {
      token,
      password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
      return;
    }

    console.log("RESET PASSWORD RESPONSE ", response.data);

    toast.success("Password changed successfully. Please login.");
    toast.dismiss(toastId);
    navigate("/login");
  } catch (error) {
    console.log("RESET PASSWORD ERROR..", error);
    toast.dismiss(toastId);
    toast.error("Error in changing password. Please try again");
    navigate("/forgot-password");
    return;
  }
};
