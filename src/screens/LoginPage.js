import React, { useState } from "react";
import { View, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";

const { width, height } = Dimensions.get("window");

// Responsive helpers
const wp = (percentage) => (width * percentage) / 100;
const hp = (percentage) => (height * percentage) / 100;

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const isFilled = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    try {
      login(email, password)
        .then(() => navigation.replace("ActualHome"))
        .catch((err) => Alert.alert("Login failed", err.message || "Unable to login"));
    } catch (err) {
      Alert.alert("Login failed", err.message || "Unable to login");
    }
  };

  return (
    <Screen>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackText>
          <MaterialIcons name="arrow-back-ios" size={wp(5)} color={colors.text} />
        </BackText>
      </TouchableOpacity>

      <Title>Log in to Chatbox</Title>

      <LoginBar />

      <LoginText>
        Welcome back! Sign in using your social account or email to continue us
      </LoginText>

    

   
      <InputContainer>
        <Label>Your email</Label>
        <TextInputStyled
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter your email"
          placeholderTextColor={colors.textMuted}
        />
      </InputContainer>

      <InputContainer>
        <Label>Password</Label>
        <PasswordWrapper>
          <TextInputStyled
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <ViewIcon>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={wp(5)}
                color={colors.textMuted}
              />
            </ViewIcon>
          </TouchableOpacity>
        </PasswordWrapper>
      </InputContainer>

      <Button
        onPress={handleLogin}
        active={isFilled && !loading}
        disabled={!isFilled || loading}
        accessibilityLabel="Log in button"
      >
        {loading ? <ActivityIndicator color={colors.white} /> : <ButtonText>Log in</ButtonText>}
      </Button>

      <ForgotText onPress={() => navigation.navigate("ForgotPassword")}>
        Forgot password?
      </ForgotText>
    </Screen>
  );
}

// Styled Components with Responsive Design
const Screen = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: flex-start;
  padding-top: ${hp(6)}px;
`;

const Title = styled.Text`
  font-size: ${wp(6)}px;
  margin-bottom: ${hp(1)}px;
  text-align: center;
  width: 100%;
  margin-top: ${hp(10)}px;
  color: ${colors.text};
`;

const LoginBar = styled.View`
  width: ${wp(16)}px;
  height: ${hp(1.2)}px;
  background-color: ${colors.primary}86;
  margin-bottom: ${hp(2)}px;
  border-radius: ${wp(0.5)}px;
  margin-top: -${hp(2)}px;
  margin-left: -${wp(30)}px;
`;

const LoginText = styled.Text`
  color: ${colors.textMuted};
  font-size: ${wp(3.5)}px;
  text-align: center;
  margin-bottom: ${hp(2)}px;
  margin-left: ${wp(20)}px;
  margin-right: ${wp(20)}px;
`;







const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${colors.border};
`;

const OrText = styled.Text`
  margin-horizontal: ${wp(3)}px;
  font-size: ${wp(3.2)}px;
  color: ${colors.textMuted};
  text-align: center;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: ${hp(3)}px;
  padding-left: ${wp(7)}px;
  padding-right: ${wp(7)}px;
  padding-top: ${hp(1)}px;
`;

const Label = styled.Text`
  font-size: ${wp(4)}px;
  color: ${colors.primary};
  margin-bottom: ${hp(1)}px;
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  padding-vertical: ${hp(1)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  font-size: ${wp(4)}px;
  color: ${colors.text};
`;

const PasswordWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ViewIcon = styled.View`
  position: relative;
  top: -${hp(0.3)}px;
  right: ${wp(12)}px;
`;

const Button = styled.TouchableOpacity`
  width: ${wp(80)}px;
  background-color: ${(props) => (props.active ? colors.primary : colors.surfaceHighlight)};
  padding-vertical: ${hp(2)}px;
  border-radius: ${wp(10)}px;
  align-items: center;
  margin-top: ${hp(20)}px;
`;

const ButtonText = styled.Text`
  font-size: ${wp(4.2)}px;
  color: ${colors.white};
  font-weight: 500;
`;

const BackText = styled.Text`
  color: ${colors.textMuted};
  margin-right: ${wp(80)}px;
`;

const ForgotText = styled.Text`
  margin-top: ${hp(2)}px;
  font-size: ${wp(3.5)}px;
  color: ${colors.primary};
  text-align: center;
`;
