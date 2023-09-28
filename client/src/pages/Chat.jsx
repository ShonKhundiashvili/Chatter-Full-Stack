import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from "../socket";
import axios from "axios";

const ChatContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 500px;
  background-color: #b0b0b0;
  color: white;
  padding: 30px;
`;

const SidebarHeader = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SidebarGroupList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarGroupItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ChatContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");

  const send = () => {
    setMessages((prev) => [...prev, { message: typingMessage }]);
    socket.emit("send-message", { message: typingMessage });
    setTypingMessage("");
  };

  useEffect(() => {
    const receiveMessage = (value) => {
      setMessages((prev) => [...prev, value]);
    };
    socket.on("receive-message", receiveMessage);
    return () => {
      socket.off("receive-message", receiveMessage);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/chat/request")
      .then((res) => setMessages(res.data));
  }, []);

  const groups = [
    { id: 1, name: "Group 1" },
    { id: 2, name: "Group 2" },
    { id: 3, name: "Group 3" },
  ];

  return (
    <ChatContainer>
      <SidebarContainer>
        <SidebarHeader>Your Chats</SidebarHeader>
        <SidebarGroupList>
          {groups.map((group) => (
            <SidebarGroupItem key={group.id}>{group.name}</SidebarGroupItem>
          ))}
        </SidebarGroupList>
      </SidebarContainer>
      <ChatContent>
        <ul>
          {messages.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <input
          value={typingMessage}
          onChange={(event) => setTypingMessage(event.target.value)}
        />
        <button onClick={send}>Submit</button>
      </ChatContent>
    </ChatContainer>
  );
}
