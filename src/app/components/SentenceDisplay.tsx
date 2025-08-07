export default function SentenceDisplay({
  text,
  timeLeft,
}: {
  text: string;
  timeLeft: number;
}) {
  return (
    <>
      <p className="mb-2 text-lg font-semibold text-gray-900">
        Time Left: {timeLeft}s
      </p>
      <p className="mb-4 text-xl whitespace-pre-wrap text-gray-900">{text}</p>
    </>
  );
}
