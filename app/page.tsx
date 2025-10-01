"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/components/SocketProvider";

export default function Home() {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState("general");
  const [currentRoom, setCurrentRoom] = useState("general");

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit("joinRoom", currentRoom);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    const onMessage = (payload: string | { room: string; message: string }) => {
      const msg = typeof payload === 'string' ? payload : payload.message;
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, [socket, currentRoom]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("message", { room: currentRoom, message });
      setMessage("");
    }
  };

  const joinRoom = () => {
    if (socket && room.trim() && room !== currentRoom) {
      socket.emit("leaveRoom", currentRoom);
      setMessages([]); // Clear messages when changing rooms
      setCurrentRoom(room);
      socket.emit("joinRoom", room);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p>
        <p>Current Room: {currentRoom}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Button onClick={joinRoom}>Join Room</Button>
        </div>

        <div className="py-1 border rounded-lg shadow-xs">
          <div className="container flex flex-col h-64 w-96 p-4 overflow-auto">
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </main>
  );
}