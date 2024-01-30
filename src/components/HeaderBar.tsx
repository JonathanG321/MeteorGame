import ScoreDisplay from "./ScoreDisplay";

export default function HeaderBar({ highScore }: { highScore: number }) {
  return (
    <div className="flex h-20 w-full items-center justify-end border-4 border-black">
      <ScoreDisplay header="High Score" displayPoints={highScore} />
    </div>
  );
}
