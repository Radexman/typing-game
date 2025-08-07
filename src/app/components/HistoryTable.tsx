export default function HistoryTable({
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
    <div className="mt-8">
      <h2 className="mb-4 text-center text-2xl font-bold text-blue-700">
        Game Results
      </h2>
      <table className="mx-auto w-full max-w-xl table-auto border-collapse overflow-hidden rounded-md shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-4 py-2">Round</th>
            <th className="border px-4 py-2">WPM</th>
            <th className="border px-4 py-2">Accuracy</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ wpm, accuracy, timestamp, round }, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="border px-4 py-2 text-center">{round}</td>
              <td className="border px-4 py-2 text-center">{wpm}</td>
              <td className="border px-4 py-2 text-center">
                {(accuracy * 100).toFixed(1)}%
              </td>
              <td className="border px-4 py-2 text-center">
                {new Date(timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
