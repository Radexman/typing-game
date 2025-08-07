export default function History({
  history,
}: {
  history: { wpm: number; accuracy: number; timestamp: number }[];
}) {
  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xl font-bold">History</h2>
      {history.length === 0 ? (
        <p>No rounds played yet.</p>
      ) : (
        <ul>
          {history.map(({ wpm, accuracy, timestamp }, i) => (
            <li key={i}>
              {new Date(timestamp).toLocaleTimeString()}: {wpm} WPM,{" "}
              {(accuracy * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
