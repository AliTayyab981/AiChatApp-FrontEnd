import { apiRequest, setAuthToken } from "./client";

export async function loginApi(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setAuthToken(data.accessToken);
  return data;
}



export async function meApi() {
  return apiRequest("/users/me");
}

export async function forgotPasswordApi(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}
export async function resetPasswordApi({ email, otp, password }) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: { email, otp, password },
  });
}

