import Screen from "./Screen";
import {useEffect, useState} from "react";
import consts from "../utils/consts";
import {useInterval} from "usehooks-ts";
import ControlPanel from "./ControlPanel";
import ScoreBar from "./ScoreBar";

export default function Game({reset, displayGameOverModal, muteMusic}) {
  
  function initScreen() {
    const screen = [];

    for(let i = 0; i < consts.cellsHeight; i++) {
      screen.push([])
      for(let j = 0; j < consts.cellsWidth; j++) {
        screen[i].push({active: false})
      }
    }

    return screen;
  }
  
  // screen to draw, combination of figure and stable screen
  const [screen, setScreen] = useState(() => initScreen());

  // background screen with all cells that was set before
  const [stableScreen, setStableScreen] = useState(() => (screen.map(el => [...el])))
  
  const [figureIdx, setFigureIdx] = useState(() => (getRandomFigureIdx()));
  const [figureVariantIdx, setFigureVariantIdx] = useState(() => 0);
  const [figureColor, setFigureColor] = useState(() => (getRandomColor()));
  
  const [nextFigure, setNextFigure] = useState(() => (getNewNextFigure()));
  const [figure, setFigure] = useState(() => (getNewFigure()));
  
  useEffect(() => {
    setFigure(prev => ({...prev, array: getColoredFigure(consts.figures[figureIdx][figureVariantIdx], figureColor)}))
  }, [figureIdx, figureVariantIdx])
  
  // states for interval
  const [run, setRun] = useState(() => false);
  const [delay, setDelay] = useState(() => 1000);
  const [score, setScore] = useState(() => 0);
  
  const [figuresCounter, setFiguresCounter] = useState(() => 0);
  const [level, setLevel] = useState(() => 1);
  
  useEffect(() => {
    const newLevel = Math.floor(figuresCounter / consts.figuresPerLevel) + 1;
    if(newLevel > level) {
      setLevel(newLevel);
      if(delay > 100) {
        setDelay(prev => prev - 100);
      } else if (delay > 50) {
        setDelay(50);
      }
    }
  }, [figuresCounter]);
  
  function getColoredFigure(figure, color) {
    return figure.map(row => [...row.map(cell => ({...cell, color: cell.active ? color : "white"}))])
  }
  
  function getRandomFigureIdx() {
    return Math.floor(Math.random() * consts.figures.length);
  }
  
  function getRandomColor() {
    return consts.colors[Math.floor(Math.random() * consts.colors.length)];
  }
  
  function getNewFigure() {
    return {i: -1, j: 4, array: getColoredFigure(consts.figures[figureIdx][0], figureColor)};
  }
  
  function getNewNextFigure() {
    const idx = getRandomFigureIdx();
    const color = getRandomColor();
    return {color: color, nextFigureIdx: idx, figure: getColoredFigure(consts.figures[idx][0], color).reverse()};
  }
  
  function setNextFigureVariantIdx() {
    setFigureVariantIdx(prev => (prev < consts.figures[figureIdx].length - 1 ? prev + 1 : 0));
  }
  
  function moveLeft() {
    if(!run) {
      return;
    }
    if(canMoveLeft(1, figure)) {
      moveFigure(consts.left, 1);
    }
  }

  function moveRight() {
    if(!run) {
      return;
    }
    if(canMoveRight()) {
      moveFigure(consts.right);
    }
  }
  
  function moveDown() {
    if(!run) {
      return;
    }
    if(canMoveDown()) {
      moveFigure();
    } else {
      drawFigure(false);
      if(stableScreen[0][4].active) {
        displayGameOverModal(score);
        reset();
      }
      setFigureColor(nextFigure.color);
      setFigureIdx(nextFigure.nextFigureIdx);
      setNextFigure(getNewNextFigure());
      setFigureVariantIdx(0);
      setFigure(prev => ({...prev, i: -1, j: 4}));
      setFiguresCounter(prev => prev + 1);
    }
  }
  
  useEffect(() => {
    const rowsToDestruct = getRowsToDestruct();
    if(rowsToDestruct.length > 0) {
      drawRowsDestruction(rowsToDestruct);
      const addScore = rowsToDestruct.length * 10 * level * (rowsToDestruct.length === 4 ? 4 : 1);
      setScore(prev => prev + addScore);
    }
  }, [stableScreen]);
  
  function getRowsToDestruct() {
    const rowsIdxs = [];
    stableScreen.forEach((row, i) => {
      let toDestruct = true;
      
      for(const cell of row) {
        if(!cell.active) {
          toDestruct = false;
          break;
        }
      }
      
      if(toDestruct) {
        rowsIdxs.push(i);
      }
    });
    return rowsIdxs;
  }
  
  function moveRemainingRows(rowsIdxs) {
    const newScreen = stableScreen.map(el => [...el]);
    let movedRows = 0;
    
    for(let i = rowsIdxs[0] - 1; i >= 0; i--){
      let distance = 0;
      
      rowsIdxs.forEach(idx => {
        if(idx > i) {
          distance++;
        }
      });
      
      if(distance > movedRows) {
        movedRows = distance;
      }

      newScreen[i + distance] = stableScreen[i];
    }
    
    for(let i = 0; i < movedRows; i++) {
      newScreen[i] = newScreen[i].map(cell => ({active: false}));
    }
    
    setStableScreen(newScreen);
  }
  
  function drawRowsDestruction(rowsIdxs) {
    const newScreen = stableScreen.map(el => [...el]);
    
    rowsIdxs.forEach(idx => {
      newScreen[idx] = newScreen[idx].map(cell => ({active: false}));
    });
    
    setStableScreen(newScreen);
    
    setTimeout(() => {
      moveRemainingRows(rowsIdxs);
    }, 50);
  }
  
  function start() {
    setRun(true);
  }
  
  useEffect(() => {
    drawFigure(true);
  }, [figure]);
  
  function moveFigure(direction, distance) {
    if(direction === consts.left) {
      setFigure(prev => ({...prev, j: prev.j - distance}));
    } else if(direction === consts.right) {
      setFigure(prev => ({...prev, j: prev.j + 1}));
    } else {
      setFigure(prev => ({...prev, i: prev.i + 1}));
    }
  }
  
  function round() {
    const nextFigureVariantId = figureVariantIdx < consts.figures[figureIdx].length - 1 ? figureVariantIdx + 1 : 0;
    const newFigure = {...figure, array: consts.figures[figureIdx][nextFigureVariantId]};
    
    const distance = newFigure.j + newFigure.array[0].length - consts.cellsWidth;
    if(distance > 0) {
      if(canMoveLeft(distance, newFigure)) {
        moveFigure(consts.left, distance);
      } else {
        return;
      }
    } else {
      if(!canMoveLeft(0, newFigure)) {
        return;
      }
    }
    
    setNextFigureVariantIdx();
  }
  
  function canMoveLeft(distance, figure) {
    for(let i = 0; i < figure.array.length; i++) {
      const row = figure.array[i];
      for(let j = 0; j < row.length; j++) {
        const newJ = figure.j + j - distance;
        if(row[j].active && (newJ < 0 || (figure.i - i >= 0 && stableScreen[figure.i - i][newJ].active))) {
          return false;
        }
      }
    }
    return true;
  }

  function canMoveRight() {
    for(let i = 0; i < figure.array.length; i++) {
      const row = figure.array[i];
      for(let j = 0; j < row.length; j++) {
        const newJ = figure.j + j + 1;
        if(row[j].active && (newJ >= consts.cellsWidth || (figure.i - i >= 0 && stableScreen[figure.i - i][newJ].active))) {
          return false;
        }
      }
    }
    return true;
  }

  function canMoveDown() {
    for(let i = 0; i < figure.array.length; i++) {
      const row = figure.array[i];
      for(let j = 0; j < row.length; j++) {
        const newI = figure.i - i + 1;
        if(row[j].active && (newI >= consts.cellsHeight || (newI >= 0 && stableScreen[newI][figure.j + j].active))) {
          return false;
        }
      }
    }
    return true;
  }
  
  function drawFigure(temporary) {
    const newScreen = stableScreen.map(el => [...el]);

    for(let i = 0; i < figure.array.length; i++) {
      const row = figure.array[i];
      for(let j = 0; j < row.length; j++) {
        if(figure.i - i >= 0 && row[j].active) {
          newScreen[figure.i - i][figure.j + j] = {...row[j]};
        }
      }
    }

    if(temporary) {
      setScreen(newScreen);
    } else {
      setStableScreen(newScreen);
    }
  }
  
  useInterval(
    moveDown,
    run ? delay : null
  );
  
  return (
    <div className="Game">
      <div className="d-flex">
        <div style={{flex: 2}}>
          <Screen screen={screen} cellSize={30} className={"Screen"}/>
        </div>
        <div style={{flex: 1}}>
          <ScoreBar
            score={score}
            nextFigure={nextFigure}
            level={level}
          />
        </div>
      </div>
      <div>
        <ControlPanel
            moveLeft={moveLeft}
            moveRight={moveRight}
            moveDown={moveDown}
            start={start}
            round={round}
            muteMusic={muteMusic}
        />
      </div>
    </div>
  );
}