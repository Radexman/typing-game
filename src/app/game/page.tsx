"use client";

import { useEffect, useState, useRef } from "react";
import { SENTENCES } from "@/constants";
import SentenceDisplay from "../components/SentenceDisplay";
import TypingInput from "../components/TypingInput";
import Controls from "../components/Controls";
import Stats from "../components/Stats";
import HistoryTable from "../components/HistoryTable";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function startRound(roundNumber: number) {
    const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setTarget(sentence);
    setInput("");
    setTimeLeft(ROUND_LENGTH);
    setRunning(true);
    setWpm(0);
    setAccuracy(1);
    setRound(roundNumber);
  }

  function endRound() {
    setRunning(false);
    setHistory((h) => [...h, { wpm, accuracy, timestamp: Date.now(), round }]);
  }

  // Auto focus input when round starts
  useEffect(() => {
    if (running && inputRef.current) {
      inputRef.current.focus();
    }
  }, [running]);

  // Update WPM and accuracy
  useEffect(() => {
    if (!running) return;

    // Auto-stop if user finished typing sentence
    if (input === target) {
      clearInterval(intervalRef.current!);
      endRound();
      if (round < TOTAL_ROUNDS) {
        setTimeout(() => startRound(round + 1), 1500);
      }
      return;
    }

    const correctChars = input
      .split("")
      .filter((char, i) => char === target[i]).length;
    const accuracyCalc = input.length > 0 ? correctChars / input.length : 1;
    setAccuracy(accuracyCalc);

    const minutesElapsed = (ROUND_LENGTH - timeLeft) / 60 || 1 / 60;
    const wordsTyped = input.length / 5;
    const wpmCalc = Math.round(wordsTyped / minutesElapsed);
    setWpm(wpmCalc);
  }, [input, timeLeft, target, running]);

  // Timer
  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(intervalRef.current!);
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

  // Start whole game
  function startGame() {
    setHistory([]);
    startRound(1);
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-700">
        Typing Game (Offline)
      </h1>

      {round > 0 && round <= TOTAL_ROUNDS && (
        <p className="mb-4 text-center font-semibold text-gray-600">
          Round {round} / {TOTAL_ROUNDS}
        </p>
      )}

      <SentenceDisplay text={target} timeLeft={timeLeft} />

      <TypingInput
        ref={inputRef}
        value={input}
        onChange={setInput}
        disabled={!running}
        placeholder={running ? "Start typing..." : "Press Start"}
        autoFocus={running}
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

      {!running && history.length === TOTAL_ROUNDS && (
        <HistoryTable history={history} />
      )}
    </div>
  );
}
