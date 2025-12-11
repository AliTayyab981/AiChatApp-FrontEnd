import React from "react";
import styled from "styled-components/native";
import { colors } from "../theme/colors";

export default function SplashContent() {
  return (
    <Container>
      <ChatImage source={require("../../assets/chatbox.png")} />
      <Title>ChatApp</Title>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: center;
`;

const ChatImage = styled.Image`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  color: ${colors.text};
  font-weight: bold;
`;
