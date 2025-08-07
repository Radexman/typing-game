import GameClient from "./GameClient";

const GamePage = () => {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Typing Game</h1>
      <GameClient />
    </div>
  );
};

export default GamePage;
