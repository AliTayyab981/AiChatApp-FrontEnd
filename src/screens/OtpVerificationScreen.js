import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");
const wp = (p) => (width * p) / 100;
const hp = (p) => (height * p) / 100;

export default function OtpVerificationScreen({ route, navigation }) {
  const { email, name, password } = route.params || {};
  const [otp, setOtp] = useState("");
  const { verifySignupOtp, resendOtp, loading } = useAuth();

  const [resendCooldown, setResendCooldown] = useState(0);
  const resendTimer = useRef(null);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email || !name || !password) {
      Alert.alert(
        "Error",
        "Missing required data. Please signup again.",
        [{ text: "OK", onPress: () => navigation.replace("SignUp") }]
      );
    }
  }, [email, name, password]);

  useEffect(() => {
    if (resendCooldown === 0 && resendTimer.current) {
      clearInterval(resendTimer.current);
    }
  }, [resendCooldown]);

  const startResendCooldown = () => {
    setResendCooldown(60);
    resendTimer.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(resendTimer.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onVerifyPress = () => {
    if (!otp || otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit OTP sent to your email.");
      return;
    }
    verifySignupOtp(email, otp)
      .then(() => {
        Alert.alert("Success", "Account created successfully!");
        navigation.replace("Login");
      })
      .catch((err) => {
        Alert.alert("Verification Failed", err.message || "Invalid OTP");
      });
  };

  const onResendOtp = async () => {
    if (resendCooldown > 0) return;

    setResendLoading(true);

    try {
      const data = await resendOtp(email);
      Alert.alert("OTP resent", data.message || "Please check your email for the new OTP.");
      startResendCooldown();
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Root behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <StatusBar barStyle="dark-content" />

      <BackWrapper
        accessibilityLabel="Go back"
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={wp(6)} color="#2d6a6a" />
      </BackWrapper>

      <Content>
        <Heading>Verify Your Account</Heading>

        <SubHeading>OTP sent to</SubHeading>
        <EmailText selectable>{email}</EmailText>

        <Instruction>
          Enter the 6-digit OTP below:
        </Instruction>

        <OtpInput
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          placeholder="______"
          autoFocus
          placeholderTextColor="#666"
          textAlign="center"
          accessibilityLabel="OTP Input"
        />

        <VerifyButton
          onPress={onVerifyPress}
          disabled={loading}
          active={!loading}
          accessibilityRole="button"
          accessibilityState={{ disabled: loading }}
        >
          {loading ? (
            <LoadingIndicator />
          ) : (
            <VerifyButtonText>Verify OTP</VerifyButtonText>
          )}
        </VerifyButton>

        <ResendWrapper>
          <ResendText
            disabled={resendCooldown > 0 || resendLoading}
            onPress={onResendOtp}
            accessibilityRole="button"
          >
            {resendLoading
              ? "Sending..."
              : `Resend OTP ${resendCooldown > 0 ? `in ${resendCooldown}s` : ""}`}
          </ResendText>
        </ResendWrapper>
      </Content>
    </Root>
  );
}

/* Styled Components */

const Root = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #0d1217;
  padding: ${hp(3)}px ${wp(7)}px;
`;

const BackWrapper = styled.TouchableOpacity`
  padding: ${hp(1)}px 0;
  align-self: flex-start;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.Text`
  font-size: ${wp(8)}px;
  font-weight: 700;
  color: #2d6a6a;
  margin-bottom: ${hp(1)}px;
`;

const SubHeading = styled.Text`
  font-size: ${wp(4)}px;
  color: #9abbbd;
  margin-bottom: ${hp(0.5)}px;
`;

const EmailText = styled.Text`
  font-size: ${wp(4.5)}px;
  color: #d6f0f0;
  margin-bottom: ${hp(3)}px;
`;

const Instruction = styled.Text`
  font-size: ${wp(4.2)}px;
  color: #cbd6d6;
  text-align: center;
  margin-bottom: ${hp(4)}px;
  padding-horizontal: ${wp(5)}px;
  line-height: ${hp(3)}px;
`;

const OtpInput = styled.TextInput`
  width: 65%;
  padding-vertical: ${hp(1.5)}px;
  font-size: ${wp(9)}px;
  color: #d6f0f0;
  border-width: 1px;
  border-color: #2d6a6a;
  border-radius: ${wp(3)}px;
  margin-bottom: ${hp(5)}px;
  letter-spacing: 20px;
  font-weight: 600;
  background-color: #121b22;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 1px;
`;

const VerifyButton = styled.TouchableOpacity`
  width: 90%;
  padding-vertical: ${hp(2.2)}px;
  border-radius: ${wp(7)}px;
  background-color: ${(p) => (p.active ? "#2d6a6a" : "#567a7a")};
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.5px;
`;

const VerifyButtonText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: ${wp(4.5)}px;
`;

const LoadingIndicator = styled.ActivityIndicator.attrs(() => ({
  color: "white",
  size: "small",
}))`
  margin: ${hp(1)}px 0;
`;

const ResendWrapper = styled.View`
  margin-top: ${hp(3)}px;
`;

const ResendText = styled.Text`
  font-size: ${wp(4)}px;
  color: ${(p) => (p.disabled ? "#555" : "#2d6a6a")};
  text-decoration-line: ${(p) => (p.disabled ? "none" : "underline")};
  font-weight: 600;
`;
