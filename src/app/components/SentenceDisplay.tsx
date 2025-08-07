export default function SentenceDisplay({
  text,
  timeLeft,
}: {
  text: string;
  timeLeft: number;
}) {
  return (
    <>
      <p className="mb-2 text-lg font-semibold">Time Left: {timeLeft}s</p>
      <p className="mb-4 text-xl whitespace-pre-wrap">{text}</p>
    </>
  );
}
