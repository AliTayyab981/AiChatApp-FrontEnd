import React from "react";
import { SafeAreaView, FlatList, Image, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const dataStories = [
  { id: "1", name: "My status", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Adil", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Marina", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "4", name: "Dean", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: "5", name: "Max", avatar: "https://i.pravatar.cc/150?img=5" },
];

const dataChats = [
  {
    id: "0",
    name: "Design Team",
    msg: "Final UI screens are ready. Check the updates.",
    time: "1 min ago",
    avatar: "https://i.pravatar.cc/150?img=12",
    unread: 2,
  },
  {
    id: "1",
    name: "Alex Linderson",
    msg: "How are you today?",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=6",
    unread: 3,
  },
  {
    id: "2",
    name: "Team Align",
    msg: "Don't miss to attend the meeting.",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=7",
    unread: 0,
  },
  {
    id: "3",
    name: "John Abraham",
    msg: "Hey! Can you join this meeting?",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=8",
    unread: 4,
  },
  {
    id: "4",
    name: "Sabila Sayma",
    msg: "How are you today?",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=9",
    unread: 0,
  },
  {
    id: "5",
    name: "John Borino",
    msg: "Have a good day ☀️",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=10",
    unread: 0,
  },
  {
    id: "6",
    name: "Ayesha Noor",
    msg: "Are you coming tomorrow?",
    time: "3 min ago",
    avatar: "https://i.pravatar.cc/150?img=13",
    unread: 1,
  },
  {
    id: "7",
    name: "Developers Hub",
    msg: "Sprint meeting starts in 5 minutes.",
    time: "5 min ago",
    avatar: "https://i.pravatar.cc/150?img=14",
    unread: 5,
  },
  {
    id: "8",
    name: "Rafay Khan",
    msg: "Send me the latest build.",
    time: "7 min ago",
    avatar: "https://i.pravatar.cc/150?img=15",
    unread: 0,
  },
  {
    id: "10",
    name: "Design Team",
    msg: "Final UI screens are ready. Check the updates.",
    time: "1 min ago",
    avatar: "https://i.pravatar.cc/150?img=12",
    unread: 2,
  },
  {
    id: "11",
    name: "Alex Linderson",
    msg: "How are you today?",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=6",
    unread: 3,
  },
  {
    id: "12",
    name: "Team Align",
    msg: "Don't miss to attend the meeting.",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=7",
    unread: 0,
  },
];

export default function ChatHome() {
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <Left>
            <Ionicons name="search" size={24} color="white" />
          </Left>
          <Title>Home</Title>
          <Right>
            <ProfileImage
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            />
          </Right>
        </Header>

        <StoriesWrapper>
          <StoriesList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataStories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Story>
                <StoryAvatar source={{ uri: item.avatar }} />
                <StoryName numberOfLines={1}>{item.name}</StoryName>
              </Story>
            )}
          />
        </StoriesWrapper>

        <FlatList
          data={dataChats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <ChatItem>
              <Avatar source={{ uri: item.avatar }} />
              <ChatContent>
                <Row>
                  <ChatName numberOfLines={1}>{item.name}</ChatName>
                  <ChatTime>{item.time}</ChatTime>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <ChatMsg numberOfLines={1}>{item.msg}</ChatMsg>
                  {item.unread > 0 && <UnreadBadge>{item.unread}</UnreadBadge>}
                </Row>
              </ChatContent>
            </ChatItem>
          )}
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: 0,
          }}
        />
      </SafeAreaView>

      <BottomTab>
        <TabItem>
          <Ionicons name="chatbubble-ellipses-outline" size={22} />
          <TabLabel>Message</TabLabel>
        </TabItem>
        <TabItem>
          <Ionicons name="call-outline" size={22} />
          <TabLabel>Calls</TabLabel>
        </TabItem>
        <TabItem>
          <Ionicons name="people-outline" size={22} />
          <TabLabel>Contacts</TabLabel>
        </TabItem>
        <TabItem>
          <Ionicons name="settings-outline" size={22} />
          <TabLabel>Settings</TabLabel>
        </TabItem>
      </BottomTab>
    </Container>
  );
}


const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Header = styled.View`
  background-color: black;
  color: white;
  height: 150px;
  padding: 12px 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.View`
  width: 45px;
  height: 45px;
  align-items: flex-start;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 55px;
`;
const Right = styled.View``;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;
const ProfileImage = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const StoriesWrapper = styled.View`
  height: 120px;
  padding-left: 12px;
  background-color: black;
`;
const StoriesList = styled.FlatList``;

const Story = styled.View`
  width: 72px;
  align-items: center;
  margin-right: 10px;
`;
const StoryAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 2px;
  border-color: #2ecc71;
`;
const StoryName = styled.Text`
  font-size: 12px;
  margin-top: 6px;
  color: white;
`;

const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  background-color: white;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 27px;
`;
const ChatContent = styled.View`
  flex: 1;
  margin-left: 12px;
  paddig-top: 120px;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ChatName = styled.Text`
  font-weight: 700;
  font-size: 16px;
`;
const ChatTime = styled.Text`
  font-size: 12px;
  color: #999;
`;
const ChatMsg = styled.Text`
  color: #666;
  flex: 1;
  margin-right: 8px;
`;
const UnreadBadge = styled.Text`
  background-color: #ff3b30;
  color: #fff;
  min-width: 22px;
  text-align: center;
  padding: 3px 7px;
  border-radius: 12px;
  font-weight: 700;
`;

const BottomTab = styled.View`
  height: 70px;
  background-color: white;
  border-top-width: 1px;
  border-top-color: #eee;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const TabItem = styled.TouchableOpacity`
  align-items: center;
`;
const TabLabel = styled.Text`
  font-size: 12px;
  margin-top: 4px;
`;