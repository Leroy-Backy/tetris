import './App.css';
import Game from "./components/Game";
import {useState, useEffect} from "react";
import Popup from "./components/Popup";
import music from "./music.mp3";

function App() {
  const [counter, setCounter] = useState(() => 0);
  const [showModal, setShowModal] = useState(() => false);
  const [showStartModal, setShowStartModal] = useState(() => true);
  const [msg, setMsg] = useState(() => "");
  
  function displayGameOverModal(scores) {
    setMsg(`Game over, your scores: ${scores}`);
    setShowModal(true);
  }

  const [audio, setAudio] = useState(() => {
    const audio = new Audio(music);
    audio.volume = 0.1;
    audio.loop = true;
    return audio;
  });

  useEffect(() => {
    if(!showStartModal) {
      audio.play();
    }
  }, [showStartModal]);
  
  function muteMusic() {
    audio.muted = !audio.muted;
  }
  
  return (
    <div className="App">
      <Game key={counter} 
            reset={() => {setCounter(prev => prev + 1)}}
            displayGameOverModal={displayGameOverModal}
            muteMusic={muteMusic}
      />
      <Popup msg={msg}
             showModal={showModal}
             setShowModal={setShowModal}
      />
      <Popup msg={'⬅ - A\n➡ - D\n⬇ - S\n⟳ - space'}
             showModal={showStartModal}
             setShowModal={setShowStartModal}
      />
    </div>
  );
}

export default App;
