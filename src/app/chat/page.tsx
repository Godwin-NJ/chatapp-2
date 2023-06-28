"use client";
import { useEffect, useState, useRef } from "react";
import ChatBar from "../ChatBar/page";
import ChatBody from "../ChatBody/page";
import ChatFooter from "../ChatFooter/page";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export default function page() {
  const [messages, setMessages] = useState<any>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef<any>(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
    setTimeout(() => {
      socket.on("noTypingResponse", (data) => setTypingStatus(data));
    }, 5000);
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
