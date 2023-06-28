"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import HomePage from "./Home/page";
// import ChatPage from "./chat/page";
const socket = io("http://localhost:4000");

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>Loading</>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomePage socket={socket} />
    </main>
  );
}
