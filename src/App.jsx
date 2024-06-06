import './App.css'
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram.js";
function App() {
    const {onToggleButton,tg}=useTelegram();
    useEffect(()=>{
        tg.ready();
    },[])



  return (
    <div>

        <button onClick={onToggleButton}>Трахнуть меня</button>

    </div>
  )
}

export default App
