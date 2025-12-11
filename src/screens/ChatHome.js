import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert,
  Button,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { createConversation, getConversations } from "../api/chat";
import { colors } from "../theme/colors";

const { width, height } = Dimensions.get("window");

// Responsive helpers
const wp = (percentage) => (width * percentage) / 100;
const hp = (percentage) => (height * percentage) / 100;

const fallbackStories = [
  { id: "1", name: "My status", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Adil", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Marina", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "4", name: "Dean", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: "5", name: "Max", avatar: "https://i.pravatar.cc/150?img=5" },
];

export default function ChatHome({ navigation }) {
  const { user, logout, hydrated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  useEffect(() => {
    if (hydrated && !user) {
      navigation.replace("Login");
    }
  }, [hydrated, navigation, user]);

  const formatTime = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderChat = ({ item }) => {
    const others = item.participants?.filter((p) => p._id !== user?._id) || [];
    const displayName =
      item.title ||
      (others.length ? others.map((p) => p.name || p.email).join(", ") : "Conversation");
    const avatar = item.avatarUrl || others[0]?.avatarUrl || "https://i.pravatar.cc/150";
    const lastMsg = item.lastMessage?.content || "Start chatting";
    const time = formatTime(item.lastMessage?.createdAt || item.updatedAt);

    const onOpen = () => {
      if (item.type === "group") {
        navigation.navigate("GroupFriendsChat", {
          groupName: displayName,
          groupImage: avatar,
          members: others.map((p) => p.name || p.email),
          conversationId: item._id,
        });
      } else {
        navigation.navigate("ChatFriend", {
          name: displayName,
          avatar,
          lastMsg,
          conversationId: item._id,
        });
      }
    };

    return (
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => alert("Notification toggled")}
              style={{
                width: wp(15),
                backgroundColor: colors.accent,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="notifications" size={wp(7)} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => alert("Delete pressed")}
              style={{
                width: wp(15),
                backgroundColor: colors.error,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="delete" size={wp(7)} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      >
        <ChatItem onPress={onOpen}>
          <Avatar source={{ uri: avatar }} />

          <ChatContent>
            <Row>
              <ChatName numberOfLines={1}>{displayName}</ChatName>
              <ChatTime>{time}</ChatTime>
            </Row>

            <Row style={{ alignItems: "center" }}>
              <ChatMsg numberOfLines={1}>{lastMsg}</ChatMsg>
            </Row>
          </ChatContent>
        </ChatItem>
      </Swipeable>
    );
  };

  const dataToShow = useMemo(() => {
    if (conversations.length) return conversations;
    return [];
  }, [conversations]);

  const handleCreate = async () => {
    if (!newEmail.trim()) {
      Alert.alert("Missing email", "Enter an email to start chatting");
      return;
    }
    setCreating(true);
    try {
      const conv = await createConversation(newEmail.trim(), newTitle.trim() || undefined);
      setNewEmail("");
      setNewTitle("");
      await fetchData();
      // open conversation after creation
      navigation.navigate("ChatFriend", {
        name: conv.title || newEmail.trim(),
        avatar: "https://i.pravatar.cc/150",
        lastMsg: "",
        conversationId: conv._id,
      });
    } catch (err) {
      Alert.alert("Could not create chat", err.message || "Try again");
    } finally {
      setCreating(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <SafeAreaView style={{ flex: 1 }}>
          {!hydrated && (
            <Centered>
              <ActivityIndicator />
            </Centered>
          )}
          {hydrated && !user ? null : (
            <>
              {/* HEADER */}
              <Header>
                <Left>
                  <Ionicons name="search" size={wp(6)} color={colors.text} />
                </Left>
                <Title>Home</Title>
                <Right onPress={logout}>
                  <ProfileImage source={{ uri: user?.avatarUrl || "https://i.pravatar.cc/150?img=11" }} />
                </Right>
              </Header>
              <Button title="Logout" onPress={logout} />
              {/* NEW CHAT */}
              <NewChatCard>
                <NewRow>
                  <SmallLabel>Start chat by email</SmallLabel>
                  {creating && <ActivityIndicator size="small" />}
                </NewRow>
                <NewInput
                  placeholder="friend@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={newEmail}
                  onChangeText={setNewEmail}
                />
                <NewInput
                  placeholder="Optional title"
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <CreateBtn onPress={handleCreate} disabled={creating}>
                  <CreateText>{creating ? "Creating..." : "Create conversation"}</CreateText>
                </CreateBtn>
              </NewChatCard>

              {/* STORIES */}
              <StoriesWrapper>
                <StoriesList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={fallbackStories}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Story>
                      <StoryAvatar source={{ uri: item.avatar }} />
                      <StoryName numberOfLines={1}>{item.name}</StoryName>
                    </Story>
                  )}
                />
              </StoriesWrapper>

              {/* CHATS LIST WITH SWIPEABLE */}
              {error ? (
                <ErrorText>{error}</ErrorText>
              ) : null}

              <FlatList
                data={dataToShow}
                keyExtractor={(item) => item._id || item.id}
                renderItem={renderChat}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                ListEmptyComponent={
                  loading ? (
                    <ActivityIndicator style={{ marginTop: hp(4) }} color={colors.primary} />
                  ) : (
                    <EmptyState>
                      <Ionicons name="chatbubbles-outline" size={wp(10)} color={colors.textMuted} />
                      <EmptyText>No conversations yet</EmptyText>
                    </EmptyState>
                  )
                }
                style={{
                  borderTopLeftRadius: wp(12),
                  borderTopRightRadius: wp(12),
                  paddingTop: 0,
                }}
              />

              {/* BOTTOM TAB */}
              <BottomTab>
                <TabItem>
                  <Ionicons name="chatbubble-ellipses-outline" size={wp(5.5)} color={colors.primary} />
                  <TabLabel>Message</TabLabel>
                </TabItem>

                <TabItem>
                  <Ionicons name="call-outline" size={wp(5.5)} color={colors.text} />
                  <TabLabel>Calls</TabLabel>
                </TabItem>

                <TabItem>
                  <Ionicons name="people-outline" size={wp(5.5)} color={colors.text} />
                  <TabLabel>Contacts</TabLabel>
                </TabItem>

                <TabItem>
                  <Ionicons name="settings-outline" size={wp(5.5)} color={colors.text} />
                  <TabLabel>Settings</TabLabel>
                </TabItem>
              </BottomTab>
            </>
          )}
        </SafeAreaView>
      </Container>
    </GestureHandlerRootView>
  );
}

/* ---------- STYLED COMPONENTS ---------- */

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  background-color: ${colors.background};
  height: ${hp(20)}px;
  padding: ${hp(1.5)}px ${wp(4)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.View`
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  border: 1px solid ${colors.gray};
  padding: ${wp(2)}px;
  border-radius: ${wp(12)}px;
  align-items: flex-start;
`;

const Right = styled.View``;

const Title = styled.Text`
  font-size: ${wp(5)}px;
  font-weight: 700;
  color: ${colors.text};
`;

const ProfileImage = styled.Image`
  width: ${wp(9)}px;
  height: ${wp(9)}px;
  border-radius: ${wp(4.5)}px;
`;

const StoriesWrapper = styled.View`
  height: ${hp(15)}px;
  padding-left: ${wp(3)}px;
  background-color: ${colors.background};
`;

const StoriesList = styled.FlatList``;

const Story = styled.View`
  width: ${wp(18)}px;
  align-items: center;
  margin-right: ${wp(2)}px;
`;

const StoryAvatar = styled.Image`
  width: ${wp(15)}px;
  height: ${wp(15)}px;
  border-radius: ${wp(7.5)}px;
  border-width: 2px;
  border-color: ${colors.accent};
`;

const StoryName = styled.Text`
  font-size: ${wp(3)}px;
  margin-top: ${hp(0.5)}px;
  color: ${colors.text};
`;

const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${hp(2)}px ${wp(4)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  background-color: ${colors.surface};
  align-items: center;
`;

const Avatar = styled.Image`
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  border-radius: ${wp(6)}px;
`;

const ChatContent = styled.View`
  flex: 1;
  margin-left: ${wp(3)}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ChatName = styled.Text`
  font-weight: 700;
  font-size: ${wp(4.2)}px;
  color: ${colors.text};
`;

const ChatTime = styled.Text`
  font-size: ${wp(3.2)}px;
  color: ${colors.textMuted};
`;

const ChatMsg = styled.Text`
  color: ${colors.textSecondary};
  flex: 1;
  margin-right: ${wp(2)}px;
`;

const UnreadBadge = styled.Text`
  background-color: ${colors.error};
  color: ${colors.white};
  min-width: ${wp(5.5)}px;
  text-align: center;
  padding: ${hp(0.3)}px ${wp(1.5)}px;
  border-radius: ${wp(3)}px;
  font-weight: 700;
`;

const BottomTab = styled.View`
  height: ${hp(9)}px;
  background-color: ${colors.surface};
  border-top-width: 1px;
  border-top-color: ${colors.border};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TabItem = styled.TouchableOpacity`
  align-items: center;
`;

const TabLabel = styled.Text`
  font-size: ${wp(3)}px;
  margin-top: ${hp(0.3)}px;
  color: ${colors.text};
`;

const EmptyState = styled.View`
  align-items: center;
  margin-top: ${hp(6)}px;
  gap: ${hp(1)}px;
`;

const EmptyText = styled.Text`
  color: ${colors.textMuted};
`;

const ErrorText = styled.Text`
  color: ${colors.error};
  text-align: center;
  margin: ${hp(1)}px 0;
`;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NewChatCard = styled.View`
  background-color: ${colors.surfaceHighlight};
  padding: ${hp(2)}px ${wp(4)}px;
  margin: ${hp(2)}px ${wp(3)}px ${hp(1)}px ${wp(3)}px;
  border-radius: ${wp(4)}px;
  gap: ${hp(1)}px;
`;

const NewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SmallLabel = styled.Text`
  color: ${colors.textSecondary};
  font-size: ${wp(3.5)}px;
`;

const NewInput = styled.TextInput`
  background-color: ${colors.background};
  color: ${colors.text};
  padding: ${hp(1.2)}px ${wp(3)}px;
  border-radius: ${wp(3)}px;
  border: 1px solid ${colors.border};
`;

const CreateBtn = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: ${hp(1.5)}px;
  align-items: center;
  border-radius: ${wp(3)}px;
`;

const CreateText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
`;
