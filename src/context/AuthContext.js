import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi, meApi } from "../api/auth";
import { apiRequest, setAuthToken } from "../api/client";

const AuthContext = createContext(null);

const STORAGE_KEY = "chatapp_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // load stored session
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setTokens(parsed.tokens);
          setUser(parsed.user);
          setAuthToken(parsed.tokens?.accessToken || null);
        }
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const persistSession = async (nextUser, nextTokens) => {
    setUser(nextUser);
    setTokens(nextTokens);
    setAuthToken(nextTokens?.accessToken || null);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: nextUser, tokens: nextTokens })
    );
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi(email, password);
      await persistSession(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const resendOtp = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("/auth/signup/resend-otp", {
        method: "POST",
        body: { email },
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendSignupOtp = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("/auth/signup/send-otp", {
        method: "POST",
        body: { name, email, password },
      });
      console.log(data, "data")
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // New: Verify OTP and complete signup
  const verifySignupOtp = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("/auth/signup/verify-otp", {
        method: "POST",
        body: { email, otp },
      });
      await persistSession(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (!tokens?.accessToken) return null;
    try {
      const profile = await meApi();
      await persistSession(profile, tokens);
      return profile;
    } catch {
      return null;
    }
  };

  const logout = async () => {
    setUser(null);
    setTokens(null);
    setAuthToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      tokens,
      loading,
      error,
      hydrated,
      login,
      sendSignupOtp,
      logout,
      refreshProfile,
      setError,
      verifySignupOtp,
      resendOtp
    }),
    [user, tokens, loading, error, hydrated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


