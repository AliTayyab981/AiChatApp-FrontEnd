import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { getMessages, sendMessage } from "../api/chat";
import { colors } from "../theme/colors";

export default function ChatFriend({ route, navigation }) {
  const { name, avatar, lastMsg, conversationId } = route.params;
  const { user, hydrated } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && !user) {
      navigation.replace("Login");
      return;
    }
    if (!conversationId) return;
    setLoading(true);
    getMessages(conversationId)
      .then((res) => setMessages(res))
      .finally(() => setLoading(false));
  }, [conversationId, hydrated, navigation, user]);

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

  const dateLabel = useMemo(() => {
    const today = new Date();
    return today.toDateString();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const newMsg = await sendMessage(conversationId, message.trim());
      const hydrated = {
        ...newMsg,
        sender: { _id: user?._id, name: user?.name, avatarUrl: user?.avatarUrl },
      };
      setMessages((prev) => [...prev, hydrated]);
      setMessage("");
    } catch (err) {
      console.warn("Failed to send message", err);
    }
  };

  const renderMsg = ({ item }) => {
    const isMine = item.sender?._id === user?._id;
    const time = item.createdAt
      ? new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
    const content = item.content || "";
    const Bubble = isMine ? SentMsg : ReceivedMsg;

    return (
      <Bubble>
        {!isMine ? <SenderName>{item.sender?.name}</SenderName> : null}
        <MsgText style={{ color: isMine ? colors.white : colors.text }}>{content}</MsgText>
        <MsgTime style={{ color: isMine ? colors.textMuted : colors.textMuted }}>{time}</MsgTime>
      </Bubble>
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </BackButton>

        <HeaderInfo>
          <ProfileImage source={{ uri: avatar }} />
          <HeaderText>
            {name}
            {"\n"}
            <StatusText>Active now</StatusText>
          </HeaderText>
        </HeaderInfo>

        <IconRow>
          <Ionicons
            name="videocam-outline"
            size={24}
            color={colors.text}
            style={{ marginRight: 20 }}
          />
          <Ionicons name="call-outline" size={24} color={colors.text} />
        </IconRow>
      </Header>

      <ChatArea>
        <DateSeparator>
          <DateText>{dateLabel}</DateText>
        </DateSeparator>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 12 }} />
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item, index) => item._id || String(index)}
            renderItem={renderMsg}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </ChatArea>

      <BottomBar>
        <LeftIcon>
          <Ionicons name="attach" size={30} color={colors.textMuted} />
        </LeftIcon>

        <InputWrapper>
          <MessageInput
            placeholder="Write your message"
            placeholderTextColor={colors.textMuted}
            value={message}
            onChangeText={setMessage}
          />

          <SendSmall>
            <Ionicons name="copy-outline" size={27} color={colors.textMuted} />
          </SendSmall>
        </InputWrapper>

        {message.length === 0 && (
          <>
            <RightIcon>
              <Ionicons name="camera-outline" size={28} color={colors.textMuted} />
            </RightIcon>

            <RightIcon>
              <Ionicons name="mic-outline" size={31} color={colors.textMuted} />
            </RightIcon>
          </>
        )}

        {message.length > 0 && (
          <SendButton onPress={handleSend}>
            <Ionicons name="send" size={24} color={colors.white} />
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
  padding: 0px 15px;
  justify-content: space-between;
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
  border-radius: 23px;
  margin-right: 10px;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.text};
`;

const StatusText = styled.Text`
  font-size: 12px;
  color: ${colors.textMuted};
  font-weight: 400;
`;

const IconRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChatArea = styled.View`
  flex: 1;
  padding: 15px;
`;

const DateSeparator = styled.View`
  align-self: center;
  background-color: ${colors.surfaceHighlight};
  padding: 3px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${colors.textMuted};
  font-weight: bold;
`;

const ReceivedMsg = styled.View`
  background-color: ${colors.surface};
  padding: 12px;
  border-radius: 10px;
  max-width: 80%;
  margin-bottom: 10px;
  elevation: 2;
`;

const SentMsg = styled.View`
  background-color: ${colors.primary};
  padding: 11px;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-end;
  margin-bottom: 10px;
  elevation: 2;
`;

const MsgText = styled.Text`
  font-size: 15px;
  color: ${colors.text};
`;

const MsgTime = styled.Text`
  font-size: 11px;
  text-align: right;
  color: ${colors.textMuted};
  margin-top: 5px;
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
  margin: 0px 10px;
`;

const SendSmall = styled.TouchableOpacity`
  padding-left: 8px;
`;

const MessageInput = styled.TextInput`
  flex: 1;
  padding: 8px 17px;
  background-color: ${colors.surfaceHighlight};
  border-radius: 25px;
  font-size: 16px;
  color: ${colors.text};
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 12px;
  border-radius: 25px;
  margin-left: 10px;
`;

const SentVoiceMsg = styled.View`
  background-color: ${colors.primary};
  padding: 8px 10px;
  border-radius: 16px;
  max-width: 85%;
  align-self: flex-end;
  margin-bottom: 12px;
`;

const VoiceRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PlayButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 20px;
  background-color: ${colors.accent};
  justify-content: center;
  align-items: center;
`;

const VoiceWave = styled.Image`
  width: 120px;
  height: 22px;
  margin: 0 10px;
`;

const VoiceDuration = styled.Text`
  color: white;
  font-size: 14px;
`;

const ReceivedMsgImages = styled.View`
  background-color: ${colors.surface};
  padding: 10px;
  border-radius: 12px;
  max-width: 80%;
  margin-bottom: 12px;
`;

const ImageRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ChatImg = styled.Image`
  width: 300px;
  height: 250px;
  border-radius: 10px;
`;

const SenderName = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-bottom: 4px;
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
