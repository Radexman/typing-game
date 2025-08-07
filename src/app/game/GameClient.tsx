"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io({
  path: "/api/socket",
});

export default function GameClient() {
  const { user, isLoading, isAuthenticated } = useKindeAuth();

  const [input, setInput] = useState("");
  const [target, setTarget] = useState("Waiting for round to start...");
  const [players, setPlayers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!user || !isAuthenticated) return;

    socket.emit("join", {
      userId: user.id,
      username: user.given_name || user.family_name || "Anonymous",
    });

    socket.on("round:start", ({ text, duration }) => {
      setTarget(text);
      setTimeLeft(duration);
      setInput("");
    });

    socket.on("time:update", setTimeLeft);
    socket.on("players:update", setPlayers);

    return () => {
      socket.off("round:start");
      socket.off("time:update");
      socket.off("players:update");
    };
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!user || !isAuthenticated || !input) return;
    socket.emit("progress", { userId: user.id, input });
  }, [input]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Not authenticated.</p>;
  }

  return (
    <div>
      <p className="mb-2 text-lg font-semibold">Time Left: {timeLeft}s</p>
      <p className="mb-4 text-xl">{target}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-6 w-full border p-2"
        placeholder="Start typing..."
      />
      <h2 className="mb-2 text-xl font-bold">Live Scores</h2>
      <ul>
        {players.map((p: any) => (
          <li key={p.userId}>
            {p.username} - {p.wpm || 0} WPM -{" "}
            {Math.round(p.accuracy * 100) || 0}%
          </li>
        ))}
      </ul>
    </div>
  );
}
