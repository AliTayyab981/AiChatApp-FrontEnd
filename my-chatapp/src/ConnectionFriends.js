import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";


const { width, height } =  Dimensions.get("window");

export default  function ConnectionFriends({ navigation }) {
  return (
    <Container>
      <Header>
        <ChatImage source={require("./../assets/chatbox.png")} />
        <Title>ChatApp</Title>
      </Header>
      <TextContainer>
        <BigText>
          <Text1>Connect friends </Text1>
          <Text2>easily & quickly</Text2>
        </BigText>
        <SmallText>
          Our chat app is the perfect way to stay connected with friends and
          family.
        </SmallText>
      </TextContainer>

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

      <SignupButton onPress={() => navigation.navigate("SignIn")}>
        <SignupText>Sign up with mail</SignupText>
      </SignupButton>

      <BottomTextContainer>
        <NormalText>Existing account? </NormalText>

      
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <LoginText>Log in</LoginText>
        </TouchableOpacity>
      </BottomTextContainer>
    </Container>
  );
}


const Container = styled.View`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
  background-color: black;
  padding-top: 60px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Text1 = styled.Text`
  font-weight: 400;
  color: white;
`;

const Text2 = styled.Text`
  font-weight: 800;
  color: white;
`;
const TextContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const BigText = styled.Text`
  font-size: 80px;
  padding-left: 31px;
  margin-bottom: 10px;
`;

const SmallText = styled.Text`
  font-size: 21px;
  color: gray;
  padding: 12px;
  padding-left: 30px;
`;

const ChatImage = styled.Image`
  width: 70px;
  height: 70px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const SignupButton = styled.TouchableOpacity`
  background-color: #ffffff;
  padding-vertical: 18px;
  padding-horizontal: 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  width: 90%;
  align-self: center;
`;

const SignupText = styled.Text`
  color: #1c1c1c;
  font-size: 16px;
  font-weight: 500;
`;

const BottomTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const NormalText = styled.Text`
  color: #b5b5b5;
  font-size: 14px;
`;

const LoginText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
`;

const OrDividerContainer = styled.View`
  width: ${Math.round(width * 0.9)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 14px;
  margin-bottom: 25px;
  padding-left: 30px;
  paddig: 20px;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #3a3a3a; /* dark gray line like your image */
`;

const OrText = styled.Text`
  margin-horizontal: 12px;
  padding-horizontal: 6px;
  font-size: 12px;
  color: #bdbdbd;
  background-color: #000; /* match Screen background to create "cut-out" effect */
  text-align: center;
`;

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;
const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ActualIcon = styled.View`
  padding: 15px;
  border: 2px solid gray;
  border-radius: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const RealImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 35px;
`;
