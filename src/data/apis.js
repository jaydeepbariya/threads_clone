
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const apis = {
  SEND_OTP: BASE_URL + "/auth/sendotp",
  REGISTER: BASE_URL + "/auth/register",
  LOGIN: BASE_URL + "/auth/login",
  FORGOT_PASSWORD: BASE_URL + "/auth/forgot-password",
  RESET_PASSWORD: BASE_URL + "/auth/reset-password",
  CHANGE_PASSWORD: BASE_URL + "/auth/change-password",
};
