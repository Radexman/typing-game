"use client";

import { useEffect, useState, useRef } from "react";
import { SENTENCES } from "@/constants";
import SentenceDisplay from "../components/SentenceDisplay";
import TypingInput from "../components/TypingInput";
import Controls from "../components/Controls";
import Stats from "../components/Stats";
import PlayerTable, { Player } from "../components/PlayerTable";

const TOTAL_ROUNDS = 5;
const ROUND_LENGTH = 30;

export default function TypingGame() {
  const [target, setTarget] = useState("Click Start to begin the round!");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(1);
  const [history, setHistory] = useState<
    { wpm: number; accuracy: number; timestamp: number; round: number }[]
  >([]);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const roundStartTimeRef = useRef<number | null>(null);

  function startRound(roundNumber: number) {
    const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setTarget(sentence);
    setInput("");
    setTimeLeft(ROUND_LENGTH);
    setRunning(true);
    setWpm(0);
    setAccuracy(1);
    setRound(roundNumber);
    roundStartTimeRef.current = Date.now();
  }

  function endRound() {
    setRunning(false);
    setHistory((h) => [...h, { wpm, accuracy, timestamp: Date.now(), round }]);
  }

  useEffect(() => {
    if (running && inputRef.current) {
      inputRef.current.focus();
    }
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const correctChars = input
      .split("")
      .filter((char, i) => char === target[i]).length;

    const totalTyped = input.length;
    const accuracyCalc = totalTyped > 0 ? correctChars / totalTyped : 1;
    setAccuracy(accuracyCalc);

    const now = Date.now();
    const elapsedMs = roundStartTimeRef.current
      ? Math.max(now - roundStartTimeRef.current, 3000)
      : 3000;
    const elapsedMinutes = elapsedMs / 1000 / 60;

    const wordsTyped = input.length / 5;
    const wpmCalc = Math.round(wordsTyped / elapsedMinutes);
    setWpm(wpmCalc);

    if (input === target) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      endRound();
      if (round < TOTAL_ROUNDS) {
        setTimeout(() => startRound(round + 1), 1500);
      }
    }
  }, [input, timeLeft, target, running]);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          endRound();
          if (round < TOTAL_ROUNDS) {
            setTimeout(() => startRound(round + 1), 1500);
          }
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setPlayers([
        {
          name: "TyperX",
          progress: target.slice(0, Math.floor(Math.random() * input.length)),
          wpm: Math.floor(Math.random() * 20 + 40),
          accuracy: Math.random() * 0.1 + 0.9,
        },
        {
          name: "FastFingers",
          progress: target.slice(0, Math.floor(Math.random() * input.length)),
          wpm: Math.floor(Math.random() * 30 + 30),
          accuracy: Math.random() * 0.1 + 0.8,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [input, wpm, accuracy, target, running]);

  function startGame() {
    setHistory([]);
    startRound(1);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white p-6 text-gray-900">
      <h1 className="mb-6 text-center text-3xl font-extrabold">Typing Game</h1>

      {round > 0 && round <= TOTAL_ROUNDS && (
        <p className="mb-4 text-center font-semibold">
          Round {round} / {TOTAL_ROUNDS}
        </p>
      )}

      <SentenceDisplay text={target} timeLeft={timeLeft} />

      <TypingInput
        value={input}
        onChange={setInput}
        disabled={!running}
        placeholder={running ? "Start typing..." : "Press Start"}
        target={target}
      />

      <Controls
        running={running}
        onStart={startGame}
        onStop={() => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          endRound();
        }}
      />

      {(running || round > 0) && <Stats wpm={wpm} accuracy={accuracy} />}

      <PlayerTable players={players} />

      {!running && history.length === TOTAL_ROUNDS && (
        <HistoryTable history={history} />
      )}
    </div>
  );
}

function HistoryTable({
  history,
}: {
  history: {
    wpm: number;
    accuracy: number;
    timestamp: number;
    round: number;
  }[];
}) {
  return (
    <div className="mt-8 w-full max-w-2xl overflow-x-auto rounded border border-gray-300 bg-gray-100 p-5 shadow-inner">
      <h2 className="mb-4 text-2xl font-bold">Rounds History</h2>
      <table className="w-full table-auto border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2">Round</th>
            <th className="px-4 py-2">Finished At</th>
            <th className="px-4 py-2">WPM</th>
            <th className="px-4 py-2">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ wpm, accuracy, timestamp, round }, i) => (
            <tr
              key={i}
              className={`border-b border-gray-200 ${
                i % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 font-mono font-semibold">{round}</td>
              <td className="px-4 py-2 font-mono">
                {new Date(timestamp).toLocaleTimeString()}
              </td>
              <td className="px-4 py-2 font-mono font-semibold">{wpm}</td>
              <td className="px-4 py-2 font-mono">
                {(accuracy * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
