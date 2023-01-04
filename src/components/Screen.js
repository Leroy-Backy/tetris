export default function Screen({screen, cellSize, className}) {
  return (
    <div className={className ? className : ""}>
      {screen.map((el, idx)=> (
        <div key={idx} className="screen-row">
          {el.map((cell, cellIdx) => (
            <div key={cellIdx}
                 style={{
                   backgroundColor: cell.color ? cell.color : "white",
                   width: cellSize,
                   height: cellSize
                 }}/>
          ))}
        </div>
      ))}
    </div>
  );
}