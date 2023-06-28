"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:4000");

interface homeProps {
  socket?: any;
}

export default function page(props: homeProps) {
  const { socket } = props;
  const [userName, setUserName] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName) {
      localStorage.setItem("userName", userName);
      //sends the username and socket ID to the Node.js server
      socket.emit("newUser", { userName, socketID: socket.id });
      router.push("/chat");
      return;
    }
    window.alert("Provide username");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        type="submit"
        className="home__cta"
        // onClick={() => console.log("just clicked ")}
      >
        SIGN IN
      </button>
    </form>
  );
}
