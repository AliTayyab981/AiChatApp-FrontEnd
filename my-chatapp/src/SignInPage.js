import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailError, setEmailError] = useState("");

  const accent = "#2d6a6a"; 
  const isFilled = name && email && password && confirm;


  const validateEmail = (value) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(String(value).toLowerCase());
  };

  const onCreatePress = () => {
    
    setEmailError("");

 
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }


    console.log("All good — proceed with signup");
  };

  
  const onEmailChange = (text) => {
    if (emailError) setEmailError("");
    setEmail(text);
  };

  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <TopBar>
          <MaterialIcons name="arrow-back-ios" size={20} color="#111" />
        </TopBar>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Content>
          <Heading>Sign up with Email</Heading>
          <LoginBar />

          <SubText>
            Get chatting with friends and family today by signing up for our
            chat app!
          </SubText>

          <Form>
            <Field>
              <Label>Your name</Label>
              <StyledInput value={name} onChangeText={setName} />
              <Divider />
            </Field>

            <Field>
              <Label>Your email</Label>
              <StyledInput
                  keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={onEmailChange}
             
              />
               <Divider error={!!emailError} />
              
              {emailError ? <ErrorText>{emailError}</ErrorText> : null}
            </Field>

            <Field>
              <Label>Password</Label>
              <StyledInput
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Divider />
            </Field>

            <Field>
              <Label>Confirm Password</Label>
              <StyledInput
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
              <Divider />
            </Field>
          </Form>
        </Content>
      </ScrollView>

      <Footer>
        <CreateButton 
         onPress={() => navigation.navigate("ActualHome")}
        disabled={!isFilled} active={isFilled}>
          <CreateText active={isFilled}>Create an account</CreateText>
        </CreateButton>
      </Footer>
    </Root>
  );
}


const Root = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TopBar = styled.View`
  height: 56px;
  padding-left: 12px;
  justify-content: center;
  margin-top: 30px;
`;

const Content = styled.View`
  padding-horizontal: 30px;
  padding-top: 6px;
  width: ${width}px;
  align-items: flex-start;
`;

const Heading = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #111;
  align-self: center;
  margin-top: 50px;
  margin-bottom: 8px;
`;
const LoginBar = styled.View`
  width: 55px;
  height: 8px;
  background-color: #23858586;
  margin-bottom: 20px;
  border-radius: 2px;
  margin-left: 218px;
  margin-top: -17px;
`;

const HeadingAccent = styled.Text`
  text-decoration: underline;
  font-weight: 700;
`;

const SubText = styled.Text`
  color: #bfbfbf;
  font-size: 13px;
  text-align: center;
  align-self: center;
  margin-horizontal: 23px;
  margin-bottom: 28px;
  line-height: 20px;
`;

const Form = styled.View`
  width: 100%;
  margin-top: 4px;
`;

const Field = styled.View`
  width: 100%;
  margin-bottom: 22px;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #2d6a6a; /* same label color you use elsewhere */
  margin-bottom: 10px;
  font-weight: 600;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  padding-vertical: 6px;
  font-size: 16px;
  color: #111;
`;


const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #e6e6e6;
  margin-top: 8px;
`;

const Footer = styled.View`
  padding: 14px 20px;
  align-items: center;
  background-color: transparent;
`;

const CreateButton = styled.TouchableOpacity`
  width: 94%;
  padding-vertical: 14px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.active ? "#2d6a6a" : "#f0f0f0")};
  opacity: ${(p) =>
    p.active ? 1 : 1}; /* keep same look; screenshot uses subtle gray bg */
`;

const CreateText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${(p) => (p.active ? "#fff" : "#999")};
`;

const ErrorText = styled.Text`
  color: #d9534f;
  margin-top: 6px;
  font-size: 12px;
`;
