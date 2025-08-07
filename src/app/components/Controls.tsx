export default function Controls({
  running,
  onStart,
  onStop,
}: {
  running: boolean;
  onStart: () => void;
  onStop: () => void;
}) {
  return !running ? (
    <button
      onClick={onStart}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Start
    </button>
  ) : (
    <button
      onClick={onStop}
      className="rounded bg-red-600 px-4 py-2 text-white"
    >
      Stop
    </button>
  );
}
