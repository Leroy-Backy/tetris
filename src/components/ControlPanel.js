import {useEffect, useMemo, useState} from "react";
import {Button} from "react-bootstrap";

export default function ControlPanel({moveLeft, moveRight, moveDown, start, round, muteMusic}) {
  
  useEffect(() => {
    const handler = (event) => {
      const keyCode = event.keyCode;
      
      if(keyCode === 65) {
        moveLeft();
      } else if(keyCode === 68) {
        moveRight();
      } else if(keyCode === 83) {
        moveDown();
      } else if(keyCode === 32) {
        round();
      } else {
        return;
      }
      event.preventDefault();
    };
    
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [moveDown, moveLeft, moveRight, round])
  
  return (
    <div className="control-panel">
      <Button onClick={moveLeft} className="btn-light">⬅️</Button>
      <Button style={{marginLeft: 10, marginRight: 10}} onClick={moveDown} className="btn-light">⬇</Button>
      <Button onClick={moveRight} className="btn-light">➡️</Button>
      <br/>
      <Button onClick={round} className="btn-light mt-2" style={{fontSize: 25}}>⟳</Button>
      <br/>
      <br/>
      <Button onClick={start} className="btn-light">start</Button>
      <Button onClick={muteMusic} className="btn-light">audio</Button>
    </div>
  );
}