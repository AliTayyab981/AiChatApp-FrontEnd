import { apiRequest } from "./client";

export function getConversations() {
  return apiRequest("/chat/conversations");
}

export function createConversation(participantEmail, title) {
  return apiRequest("/chat/conversations", {
    method: "POST",
    body: { participantEmail, title },
  });
}

export function getMessages(conversationId) {
  return apiRequest(`/chat/messages/${conversationId}`);
}

export function sendMessage(conversationId, content) {
  return apiRequest("/chat/messages", {
    method: "POST",
    body: { conversationId, content },
  });
}


