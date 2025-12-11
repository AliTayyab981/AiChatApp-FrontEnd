import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { getMessages, sendMessage } from "../api/chat";
import { colors } from "../theme/colors";

export default function GroupFriendsChat({ route, navigation }) {
  const { groupName, groupImage, members = [], conversationId } = route.params;
  const { user, hydrated } = useAuth();

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && !user) {
      navigation.replace("Login");
      return;
    }
    if (!conversationId) return;
    setLoading(true);
    getMessages(conversationId)
      .then((res) => setChats(res))
      .finally(() => setLoading(false));
  }, [conversationId, hydrated, navigation, user]);

  const onSend = async () => {
    if (!message.trim()) return;
    try {
      const sent = await sendMessage(conversationId, message.trim());
      setChats((prev) => [
        ...prev,
        { ...sent, sender: { _id: user?._id, name: user?.name, avatarUrl: user?.avatarUrl } },
      ]);
      setMessage("");
    } catch (err) {
      console.warn("Failed to send", err);
    }
  };

  if (!hydrated) {
    return (
      <Container>
        <Centered>
          <ActivityIndicator />
        </Centered>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </BackButton>

        <HeaderInfo>
          <ProfileImage source={{ uri: groupImage }} />
          <HeaderText>
            {groupName}
            {"\n"}
            <Members>{members.length} members</Members>
          </HeaderText>
        </HeaderInfo>

        <IconRow>
          <Ionicons name="search" size={24} color={colors.text} />
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={colors.text}
            style={{ marginLeft: 15 }}
          />
        </IconRow>
      </Header>

      <ChatScroll>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 12 }} />
        ) : (
          chats.map((msg) =>
            msg.sender?._id === user?._id ? (
              <SentMsg key={msg._id}>
                <MsgText style={{ color: colors.white }}>{msg.content}</MsgText>
                <MsgTime style={{ color: colors.textSecondary }}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </MsgTime>
              </SentMsg>
            ) : (
              <ReceivedRow key={msg._id}>
                <SenderAvatar source={{ uri: msg.sender?.avatarUrl }} />
                <ReceivedMsg>
                  <SenderName style={{ color: colors.accent }}>
                    {msg.sender?.name || "Member"}
                  </SenderName>
                  <MsgText>{msg.content}</MsgText>
                  <MsgTime>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </MsgTime>
                </ReceivedMsg>
              </ReceivedRow>
            )
          )
        )}
      </ChatScroll>

      <BottomBar>
        <LeftIcon>
          <Ionicons name="attach" size={28} color={colors.textMuted} />
        </LeftIcon>

        <InputWrapper>
          <MessageInput
            placeholder="Message"
            placeholderTextColor={colors.textMuted}
            value={message}
            onChangeText={setMessage}
          />
          <SendSmall>
            <Ionicons name="happy-outline" size={26} color={colors.textMuted} />
          </SendSmall>
        </InputWrapper>

        {message.length === 0 ? (
          <RightIcon>
            <Ionicons name="mic-outline" size={28} color={colors.textMuted} />
          </RightIcon>
        ) : (
          <SendButton onPress={onSend}>
            <Ionicons name="send" size={22} color={colors.white} />
          </SendButton>
        )}
      </BottomBar>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  margin-top: 28px;
`;

const Header = styled.View`
  height: 70px;
  background-color: ${colors.background};
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 5px;
`;

const HeaderInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-left: 10px;
`;

const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  margin-right: 10px;
`;

const HeaderText = styled.Text`
  color: ${colors.text};
  font-size: 15px;
  font-weight: bold;
`;

const Members = styled.Text`
  color: ${colors.textMuted};
  font-size: 12px;
`;

const IconRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChatScroll = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;

const SenderName = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 3px;
`;

const SentMsg = styled.View`
  background-color: ${colors.primary};
  padding: 10px 12px;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-end;
  margin-bottom: 10px;
`;

const MsgText = styled.Text`
  font-size: 15px;
  color: ${colors.text};
`;

const MsgTime = styled.Text`
  font-size: 11px;
  text-align: right;
  margin-top: 4px;
  color: ${colors.textMuted};
`;

const BottomBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  background-color: ${colors.surface};
`;

const LeftIcon = styled.TouchableOpacity`
  padding: 8px;
`;

const RightIcon = styled.TouchableOpacity`
  padding: 8px;
`;

const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surfaceHighlight};
  padding: 8px 12px;
  border-radius: 30px;
  margin: 0 10px;
`;

const MessageInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.text};
`;

const SendSmall = styled.TouchableOpacity`
  padding-left: 10px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px;
  border-radius: 25px;
`;

const RowReceived = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const MsgContent = styled.View`
  flex: 1;
`;
const ReceivedRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const SenderAvatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  margin-right: 8px;
`;

const ReceivedMsg = styled.View`
  background-color: ${colors.surface};
  padding: 10px 12px;
  border-radius: 10px;
  max-width: 75%;
  elevation: 2;
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
