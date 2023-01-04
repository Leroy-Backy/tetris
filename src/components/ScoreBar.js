import Screen from "./Screen";

export default function ScoreBar({score, nextFigure, level}) {
  return (
    <div className="score-bar">
      <div className="score">
        score: {score}
      </div>
      <div className="level">
        level: {level}
      </div>
      <Screen cellSize={15} screen={nextFigure.figure} className={"small-screen"}/>
    </div>
  );
}