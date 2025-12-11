import { Platform } from "react-native";

const defaultBase =
  Platform.OS === "android" ? "http://10.72.229.204:5000/api" : "http://localhost:5000/api";

const API_BASE = process.env.EXPO_PUBLIC_API_URL || defaultBase;

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export async function apiRequest(path, { method = "GET", body, headers = {} } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

export function getApiBase() {
  return API_BASE;
}


