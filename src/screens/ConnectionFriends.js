import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../theme/colors";

const { width, height } = Dimensions.get("window");

// Percentage width/height helpers
const wp = (p) => (width * p) / 100;
const hp = (p) => (height * p) / 100;

export default function ConnectionFriends({ navigation }) {
  return (
    <SafeArea>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: wp(6) }}>
        {/* HEADER */}
        <Header>
          <ChatImage source={require("../../assets/chatbox.png")} resizeMode="contain" />
          <Title>ChatApp</Title>
        </Header>

        {/* MAIN TEXT */}
        <TextWrapper>
          <BigText>
            Connect friends {"\n"}
            <Bold>easily & quickly</Bold>
          </BigText>

          <SmallText>
            Our chat app is the perfect way to stay connected with friends and
            family.
          </SmallText>
        </TextWrapper>

        {/* SIGNUP BUTTON */}
        <SignupButton onPress={() => navigation.navigate("SignUp")}>
          <SignupText>Sign up with mail</SignupText>
        </SignupButton>

        {/* LOGIN */}
        <BottomRow>
          <NormalText>Existing account?</NormalText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LoginText> Log in</LoginText>
          </TouchableOpacity>
        </BottomRow>
      </ScrollContainer>
    </SafeArea>
  );
}

/* ------------------------ STYLES ------------------------ */

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${hp(3)}px;
`;

const ChatImage = styled.Image`
  width: ${wp(17)}px;
  height: ${wp(17)}px;
  margin-right: ${wp(2)}px;
`;

const Title = styled.Text`
  font-size: ${wp(6)}px;
  font-weight: 700;
  color: ${colors.white};
`;

const TextWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: ${hp(4)}px;
`;

const BigText = styled.Text`
  font-size: ${wp(9)}px;
  line-height: ${wp(12)}px;
  text-align: center;
  color: ${colors.white};
  margin-bottom: ${hp(1)}px;
`;

const Bold = styled.Text`
  font-weight: 800;
`;

const SmallText = styled.Text`
  font-size: ${wp(4)}px;
  text-align: center;
  color: ${colors.textSecondary};
`;

const SignupButton = styled.TouchableOpacity`
  width: 100%;
  max-width: ${wp(85)}px;
  align-self: center;
  background-color: ${colors.white};
  padding-vertical: ${hp(2)}px;
  border-radius: ${wp(10)}px;
  margin-bottom: ${hp(3)}px;
`;

const SignupText = styled.Text`
  color: ${colors.black};
  font-size: ${wp(4)}px;
  font-weight: 600;
  text-align: center;
`;

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${hp(1)}px;
`;

const NormalText = styled.Text`
  font-size: ${wp(3.8)}px;
  color: ${colors.textMuted};
`;

const LoginText = styled.Text`
  font-size: ${wp(4)}px;
  color: ${colors.white};
  font-weight: bold;
`;
