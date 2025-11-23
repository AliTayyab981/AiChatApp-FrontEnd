import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFilled = email.length > 0 && password.length > 0; 
  return (
    <Screen>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackText>
          <MaterialIcons name="arrow-back-ios" size={22} color="" />
        </BackText>
      </TouchableOpacity>

      <Title>Log in to Chatbox</Title>

      <LoginBar />

      <LoginText>
        Welcome back! Sign in using your social account or email to continue us
      </LoginText>

      <IconContainer>
        <ActualIcon>
          <RealImage source={require("./../assets/facebook.png")} />
        </ActualIcon>
        <ActualIcon>
          <RealImage source={require("./../assets/google.png")} />
        </ActualIcon>
        <ActualIcon>
          <RealImage source={require("./../assets/iphone.jpg")} />
        </ActualIcon>
      </IconContainer>

      <OrDividerContainer>
        <Line />
        <OrText>OR</OrText>
        <Line />
      </OrDividerContainer>

      <InputContainer>
        <Label>Your email</Label>
        <TextInputStyled
        
          value={email}
          onChangeText={setEmail}
        />
      </InputContainer>

      <InputContainer>
        <Label>Password</Label>
        <PasswordWrapper>
          <TextInputStyled
          
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <ViewIcon>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color="lightgray"
              />
            </ViewIcon>
          </TouchableOpacity>
        </PasswordWrapper>
      </InputContainer>

      <Button 
         onPress={() => navigation.navigate("ActualHome")}
      active={isFilled}>
        <ButtonText>Log in</ButtonText>
      </Button>

      <ForgotText>Forgot password? password?</ForgotText>
    </Screen>
  );
}


const Screen = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: start;
  padding-top: 50px;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 6px;
  text-align: center;
  width: 100%;
  margin-top: 70px;
`;


const LoginBar = styled.View`
  width: 65px;
  height: 8px;
  background-color: #23858586;
  margin-bottom: 20px;
  border-radius: 2px;
  margin-top: -14px;
  margin-left: -120px;
`;

const LoginText = styled.Text`
  color: #bfbfbf;
  font-size: 14px;
  text-align: center;
  margin-bottom: 18px;
  align-self: center;
  margin-left: 80px;
  margin-right: 80px;
`;

const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 20px;
`;

const ActualIcon = styled.View`
padding: 13px;
  border: 2px solid lightgray;
  border-radius: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const RealImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 35px;
`;

const OrDividerContainer = styled.View`
  width: ${Math.round(width * 0.9)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 14px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  color: #bfbfbf;
  background-color: #c5c5c5ff;
`;

const OrText = styled.Text`
  margin-horizontal: 12px;
  font-size: 12px;
  color: #bfbfbf;

  text-align: center;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 25px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #2d6a6a;
  margin-bottom: 8px;
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  padding-vertical: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
  font-size: 16px;

`;

const PasswordWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ViewIcon = styled.Text`
  position: relative;
  top: -3px;
  right: 35px;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: ${(props) => (props.active ? "#2d6a6a" : "#dbdbdb81")};
  padding-vertical: 14px;
  border-radius: 30px;
  align-items: center;
  margin-top: 180px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #1e1e1e;
  font-weight: 500;
`;

const BackText = styled.Text`
  color: #aaa;
  margin-right: 330px;
`;

const ForgotText = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  color: #2d8f8f;
  text-align: center;
`;