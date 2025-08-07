"use client";

import { useEffect, useState, useRef } from "react";

import SentenceDisplay from "../components/SentenceDisplay";
import TypingInput from "../components/TypingInput";
import Controls from "../components/Controls";
import Stats from "../components/Stats";
import History from "../components/History";
import { SENTENCES } from "@/constants";

export default function TypingGame() {
  const [target, setTarget] = useState("Click Start to begin the round!");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(1);
  const [history, setHistory] = useState<
    { wpm: number; accuracy: number; timestamp: number }[]
  >([]);

  const roundLength = 30;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function startRound() {
    const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setTarget(sentence);
    setInput("");
    setTimeLeft(roundLength);
    setRunning(true);
    setWpm(0);
    setAccuracy(1);
  }

  function endRound() {
    setRunning(false);
    setHistory((h) => [...h, { wpm, accuracy, timestamp: Date.now() }]);
  }

  useEffect(() => {
    if (!running) return;

    const correctChars = input
      .split("")
      .filter((char, i) => char === target[i]).length;
    const accuracyCalc = input.length > 0 ? correctChars / input.length : 1;
    setAccuracy(accuracyCalc);

    const minutesElapsed = (roundLength - timeLeft) / 60 || 1 / 60;
    const wordsTyped = input.length / 5;
    const wpmCalc = Math.round(wordsTyped / minutesElapsed);
    setWpm(wpmCalc);
  }, [input, timeLeft, target, running]);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(intervalRef.current!);
          endRound();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Typing Game (Offline)</h1>

      <SentenceDisplay text={target} timeLeft={timeLeft} />

      <TypingInput
        value={input}
        onChange={setInput}
        disabled={!running}
        placeholder={running ? "Start typing..." : "Press Start"}
        autoFocus={running}
      />

      <Controls
        running={running}
        onStart={startRound}
        onStop={() => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          endRound();
        }}
      />

      <Stats wpm={wpm} accuracy={accuracy} />

      <History history={history} />
    </div>
  );
}
