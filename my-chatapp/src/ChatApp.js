import React from "react";
import styled from "styled-components/native";

export default function chatApp() {
  return (
    <Container>
      <ChatImage source={require("./../assets/chatbox.png")} />
      <Title>ChatAppp</Title>
    </Container>
  );
}

const Container = styled.View`
  margin-top: 400px;
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
`;
