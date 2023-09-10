import { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "axios";

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
  });
  return (
    <div>
      <lu>
        {messages.map(({ message }) => {
          return <li>{message}</li>;
        })}
      </lu>
      <input
        value={typingMessage}
        onChange={(event) => setTypingMessage(event.target.value)}
      />
      <button onClick={send}>Submit</button>
    </div>
  );
}
