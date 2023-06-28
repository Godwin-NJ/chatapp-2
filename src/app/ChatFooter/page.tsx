import { useState } from "react";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:4000");

interface chatProps {
  socket?: any;
}

export default function page(props: chatProps) {
  const { socket } = props;
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
  };

  const userStopsTyping = () => {
    socket.emit("noTyping", "");
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({ userName: localStorage.getItem("userName"), message });
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={userStopsTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
}
