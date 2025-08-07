"use client";

import React from "react";

export interface Player {
  name: string;
  progress: string;
  wpm: number;
  accuracy: number;
}

export default function PlayerTable({ players }: { players: Player[] }) {
  return (
    <div className="mt-8 w-full max-w-2xl overflow-x-auto rounded border border-blue-300 bg-blue-50 p-5 shadow-inner">
      <h2 className="mb-4 text-2xl font-bold text-blue-800">
        Live Competition
      </h2>
      <table className="w-full table-auto border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-blue-200 text-blue-900">
            <th className="px-4 py-2">Live Progress</th>
            <th className="px-4 py-2">Player Name</th>
            <th className="px-4 py-2">WPM</th>
            <th className="px-4 py-2">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              key={index}
              className={`border-b border-blue-100 ${
                index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
              }`}
            >
              <td className="px-4 py-2 font-mono text-blue-800">
                {player.progress}
              </td>
              <td className="px-4 py-2 font-semibold text-blue-900">
                {player.name}
              </td>
              <td className="px-4 py-2 font-mono text-blue-800">
                {player.wpm}
              </td>
              <td className="px-4 py-2 font-mono text-blue-800">
                {(player.accuracy * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
