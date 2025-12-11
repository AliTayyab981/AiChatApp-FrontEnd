import React, { useState } from "react";
import { Alert, ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { forgotPasswordApi } from "../api/auth";

const { width, height } = Dimensions.get("window");
const wp = (p) => (width * p) / 100;
const hp = (p) => (height * p) / 100;

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      Alert.alert("Required", "Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await forgotPasswordApi(trimmedEmail);
      Alert.alert(
        "Email sent",
        "If an account exists with this email, you will receive password reset instructions.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("ResetPassword", { email: trimmedEmail }),
          },
        ]
      );
    } catch (err) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color={colors.text} />
      </BackButton>

      <Content>
        <Title>Forgot Password</Title>
        <Description>
          Enter your email address to receive a verification code or reset link.
        </Description>

        <InputWrapper>
          <Label>Email Address</Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputWrapper>

        <SendButton onPress={handleSend} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <ButtonText>Send Instructions</ButtonText>
          )}
        </SendButton>
      </Content>
    </Container>
  );
}

// Styled components (unchanged)
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

const BackButton = styled.TouchableOpacity`
  padding: 20px;
`;

const Content = styled.View`
  padding: 24px;
  flex: 1;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: 12px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary};
  margin-bottom: 32px;
  line-height: 24px;
`;

const InputWrapper = styled.View`
  margin-bottom: 24px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  margin-bottom: 8px;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: ${colors.surfaceHighlight};
  color: ${colors.text};
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  border: 1px solid ${colors.border};
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 18px;
  border-radius: 30px;
  align-items: center;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
`;
