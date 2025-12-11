import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";
const { width, height } = Dimensions.get("window");

const wp = (p) => (width * p) / 100;
const hp = (p) => (height * p) / 100;

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailError, setEmailError] = useState("");

  const { sendSignupOtp, loading } = useAuth();

  const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

  const onCreatePress = () => {

    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Password mismatch", "Password and confirm password must match");
      return;
    }

    sendSignupOtp(name, email, password)
      .then(() => navigation.replace("VerifyOtp", { email, name, password }))
      .catch((err) =>
        Alert.alert("Signup failed", err.message || "Unable to sign up")
      );
  };

  return (
    <Root>
      <StatusBar barStyle="dark-content" />

      {/* Back Arrow */}
      <BackWrapper onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={wp(5)} color="#111" />
      </BackWrapper>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(6) }}
      >
        <Content>
          <Heading>Create your account</Heading>
          <LoginBar />

          <SubText>
            Get chatting with friends and family today by signing up for our chat
            app!
          </SubText>

          {/* FORM */}
          <Form>
            <Field>
              <Label>Your name</Label>
              <Input value={name} onChangeText={setName} />
              <Divider />
            </Field>

            <Field>
              <Label>Your email</Label>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  if (emailError) setEmailError("");
                  setEmail(text);
                }}
              />
              <Divider error={!!emailError} />
              {emailError ? <ErrorText>{emailError}</ErrorText> : null}
            </Field>

            <Field>
              <Label>Password</Label>
              <Input secureTextEntry value={password} onChangeText={setPassword} />
              <Divider />
            </Field>

            <Field>
              <Label>Confirm Password</Label>
              <Input secureTextEntry value={confirm} onChangeText={setConfirm} />
              <Divider />
            </Field>
          </Form>
        </Content>
      </ScrollView>

      {/* FOOTER */}
      <Footer>
        <CreateButton
          onPress={onCreatePress}
          disabled={!name || !email || !password || !confirm || loading}
          active={name && email && password && confirm && !loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <CreateText active={name && email && password && confirm}>
              Create account
            </CreateText>
          )}
        </CreateButton>
      </Footer>
    </Root>
  );
}

/* ------------------ STYLES (FULL RESPONSIVE) ------------------ */

const Root = styled.SafeAreaView`
  flex: 1;
  background-color: black;
`;

const BackWrapper = styled.TouchableOpacity`
  padding: ${hp(2)}px ${wp(2)}px;
  margin-top: ${hp(1)}px;
`;

const Content = styled.View`
  width: 100%;
  padding-horizontal: ${wp(7)}px;
  align-items: center;
`;

const Heading = styled.Text`
  font-size: ${wp(7)}px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-top: ${hp(3)}px;
  margin-bottom: ${hp(1.5)}px;
`;

const LoginBar = styled.View`
  width: ${wp(20)}px;
  height: ${hp(0.8)}px;
  background-color: #23858586;
  border-radius: ${wp(1)}px;
  margin-bottom: ${hp(2)}px;
`;

const SubText = styled.Text`
  color: #bfbfbf;
  font-size: ${wp(3.8)}px;
  text-align: center;
  margin-bottom: ${hp(3)}px;
  line-height: ${hp(3)}px;
  padding-horizontal: ${wp(5)}px;
`;

const Form = styled.View`
  width: 100%;
  margin-top: ${hp(1)}px;
`;

const Field = styled.View`
  width: 100%;
  margin-bottom: ${hp(3)}px;
`;

const Label = styled.Text`
  font-size: ${wp(4)}px;
  color: #2d6a6a;
  margin-bottom: ${hp(0.8)}px;
  font-weight: 600;
`;

const Input = styled(TextInput)`
  width: 100%;
  padding-vertical: ${hp(1.2)}px;
  font-size: ${wp(4.2)}px;
  color: white;
`;

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(p) => (p.error ? "#d9534f" : "#e6e6e6")};
  margin-top: ${hp(0.5)}px;
`;

const ErrorText = styled.Text`
  color: #d9534f;
  font-size: ${wp(3.3)}px;
  margin-top: ${hp(0.5)}px;
`;

const Footer = styled.View`
  padding: ${hp(2)}px ${wp(5)}px;
  align-items: center;
`;

const CreateButton = styled.TouchableOpacity`
  width: ${wp(90)}px;
  padding-vertical: ${hp(2)}px;
  border-radius: ${wp(7)}px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.active ? "#2d6a6a" : "#efefef")};
`;

const CreateText = styled.Text`
  font-size: ${wp(4.3)}px;
  font-weight: 600;
  color: ${(p) => (p.active ? "#fff" : "black")};
`;
