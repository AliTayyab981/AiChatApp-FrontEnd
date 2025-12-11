import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { resetPasswordApi } from "../api/auth";

export default function ResetPasswordScreen({ route, navigation }) {
    const { email: routeEmail } = route.params || {};

    const [email, setEmail] = useState(routeEmail || "");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        const trimmedEmail = email.trim();
        const trimmedToken = token.trim();

        if (!trimmedEmail || !trimmedToken || !password || !confirm) {
            Alert.alert("Required", "All fields are required");
            return;
        }
        if (password !== confirm) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await resetPasswordApi({ email: trimmedEmail, otp: trimmedToken, password });
            Alert.alert("Success", "Your password has been reset.", [
                { text: "Login", onPress: () => navigation.navigate("Login") },
            ]);

        } catch (err) {
            Alert.alert("Failed", err.message || "Could not reset password");
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
                <Title>Reset Password</Title>
                <Description>Enter the code sent to your email and your new password.</Description>

                {!routeEmail && (
                    <InputWrapper>
                        <Label>Email Address</Label>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email address"
                            placeholderTextColor={colors.textMuted}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </InputWrapper>
                )}

                <InputWrapper>
                    <Label>Verification Code</Label>
                    <Input
                        value={token}
                        onChangeText={setToken}
                        placeholder="Enter code"
                        placeholderTextColor={colors.textMuted}
                        autoCapitalize="none"
                    />
                </InputWrapper>

                <InputWrapper>
                    <Label>New Password</Label>
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="New password"
                        placeholderTextColor={colors.textMuted}
                    />
                </InputWrapper>

                <InputWrapper>
                    <Label>Confirm Password</Label>
                    <Input
                        value={confirm}
                        onChangeText={setConfirm}
                        secureTextEntry
                        placeholder="Confirm new password"
                        placeholderTextColor={colors.textMuted}
                    />
                </InputWrapper>

                <ResetButton onPress={handleReset} disabled={loading}>
                    {loading ? <ActivityIndicator color={colors.white} /> : <ButtonText>Reset Password</ButtonText>}
                </ResetButton>
            </Content>
        </Container>
    );
}

// Styled components (same as ForgotPasswordScreen)
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

const ResetButton = styled.TouchableOpacity`
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
