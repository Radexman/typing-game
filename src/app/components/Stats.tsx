export default function Stats({
  wpm,
  accuracy,
}: {
  wpm: number;
  accuracy: number;
}) {
  return (
    <div className="mt-6 text-gray-900">
      <h2 className="mb-2 text-xl font-bold">Your Stats</h2>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {(accuracy * 100).toFixed(1)}%</p>
    </div>
  );
}
